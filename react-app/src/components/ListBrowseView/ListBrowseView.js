import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllLists } from '../../store/lists';
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
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newList = {
            user_id: userId,
            title,
            description
        };

        const submittedList = await dispatch()
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setShowForm(false);
    }

    return (
        <div className='list-browse-page'>
            <div className='header'>
                <h1>List Browse View</h1>
                <button
                className='new-list'
                onClick={e => setShowForm(true)}
                >New List</button>
            </div>
            {showForm &&
                <div>
                    <form onSubmit={handleSubmit}>
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
            <div>
                {lists.map(list => (
                    <Link to={`/lists/${list.id}`}>
                        <h3>{list.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ListBrowseView;
