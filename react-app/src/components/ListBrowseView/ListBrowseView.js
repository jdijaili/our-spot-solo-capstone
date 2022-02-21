import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllLists, postList } from '../../store/lists';
import './ListBrowseView.css'

const ListBrowseView = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const lists = Object.values(useSelector(state => state.lists));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(getAllLists(userId));
    }, [dispatch, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newList = {
            userId,
            title,
            description
        };

        const submittedList = await dispatch(postList(newList))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

        if (submittedList) {
            setTitle('');
            setDescription('');
            setShowForm(false);
        }
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setShowForm(false);
    }

    return (
        <div className='list-browse-page'>
            <div className='list-browse-header'>
                <h1>List Browse View</h1>
                <button
                    className='new-list'
                    onClick={e => setShowForm(true)}
                >New List</button>
            </div>
            {showForm &&
                <div>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
                        <input
                            placeholder='title'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <input
                            placeholder='description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <button type='submit'>Create</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            }
            <div className='list-card-container'>
                {lists.map(list => (
                    <Link to={`/lists/${list.id}`} key={list.id}>
                        <div className='list-card'>
                            <div className='list-card-sparkle'>
                                <h2>✨</h2>
                            </div>
                            <div className='list-card-info'>
                                <h2>{list.title}</h2>
                                <h3>{list.description}</h3>
                            </div>
                            <div>
                                <img className='list-card-forward' src='https://res.cloudinary.com/jenn/image/upload/v1645474173/our-spot/icons8-forward-96_d4fpsu.png' alt='forward icon' />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ListBrowseView;
