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

        const listErrors = [];
        const regExp = /[a-zA-Z0-9!@#$%^&*()_+:?/,><\|]/g;

        if (title.length === 0) listErrors.push('Title cannot be blank.');
        if (title.length > 40) listErrors.push('Title cannot exceed 40 characters.');
        if (!regExp.test(title)) listErrors.push('Title must include valid content.');

        if (description.length > 0) {
            if (!regExp.test(description)) listErrors.push('Description must include valid content.');
        }

        if (listErrors.length > 0) {
            setErrors(listErrors);
        } else {
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
        }

    };

    const handleCancel = () => {
        setTitle('');
        setDescription('');
        setErrors([]);
        setShowForm(false);
    };

    const handleNewListClick = () => {
        if (showForm === false) {
            setShowForm(true);
        } else if (showForm === true) {
            setTitle('');
            setDescription('');
            setShowForm(false);
        }
    };

    const titleValidation = (e) => {
        if (e.target.value.length === 0) {
            setErrors(['Title must not be empty']);
        } else if (e.target.value.length > 40) {
            setErrors(['Title must not be greater than 40 characters']);
        } else {
            setErrors([]);
        }
    };

    return (
        <div className='list-browse-page'>
            <div className='list-browse-header'>
                <h1>My Lists</h1>
                <button
                    className='new-list'
                    onClick={handleNewListClick}
                >New List</button>
            </div>
            <div className='new-list-container'>
                {showForm &&
                    <div className='new-list-form-container'>
                        <h3>New List</h3>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <form className='new-list-form' onSubmit={handleSubmit}>
                            <input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
                            <input
                                placeholder='title'
                                value={title}
                                required
                                onChange={e => setTitle(e.target.value)}
                                onBlur={titleValidation}
                            />
                            <input
                                placeholder='description (optional)'
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <div>
                                <button className='new-list-form-buttons' type='submit'>Create</button>
                                <button className='new-list-form-buttons' onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                }
            </div>
            <div className='list-card-container'>
                {lists.map(list => (
                    <Link to={`/lists/${list.id}`} key={list.id}>
                        <div className='list-card'>
                            <div className='list-card-sparkle'>
                                <h2 className='sparkle'>✨</h2>
                            </div>
                            <div className='list-card-info'>
                                <h2>{list.title}</h2>
                                <h3>{list.description}</h3>
                            </div>
                            <div className='list-card-arrow'>
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
