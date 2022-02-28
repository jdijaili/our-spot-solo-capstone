import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { deleteList, editList, getList } from '../../store/lists';
import { deleteListParkRef, getParksForList } from '../../store/parks';
import ParkCard from '../ParkCard/ParkCard';
import './ListDetailView.css'

const ListDetailView = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { listId } = useParams();

    const userId = useSelector(state => state.session?.user?.id);
    const parks = Object.values(useSelector(state => state?.parks));
    const list = Object.values(useSelector(state => state?.lists)).filter(list => list.id === parseInt(listId));
    const id = list[0]?.id;


    useEffect(() => {
        dispatch(getList(listId));
        dispatch(getParksForList(listId));
    }, [dispatch, listId]);

    const [title, setTitle] = useState(list[0]?.title);
    const [description, setDescription] = useState(list[0]?.description);
    const [errors, setErrors] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const listErrors = [];
        const regExp = /[a-zA-Z0-9!@#$%^&*()_+:?/,><\|]/g;

        if (title.length === 0) listErrors.push('Title must not be left blank');
        if (title.length > 40) listErrors.push('Title cannot exceed 40 characters');
        if (!regExp.test(title)) listErrors.push('Title must include valid content');

        if (description.length > 0) {
            if (!regExp.test(description)) listErrors.push('Description must include valid content.');
        }

        if (listErrors.length > 0) {
            setErrors(listErrors);
        } else {
            const editedList = {
                id,
                title,
                description
            };

            const submittedEditedList = await dispatch(editList(editedList))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                });

            if (submittedEditedList) {
                setShowForm(false);
            }
        }

    };

    const handleEditCancel = () => {
        setTitle(list[0]?.title);
        setDescription(list[0]?.description);
        setErrors([]);
        setShowForm(false);
    };

    const handleListDelete = async (e) => {
        e.preventDefault();

        const deletedList = await dispatch(deleteList(listId))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

        if (deletedList) {
            history.push(`/lists`);
        }
    };

    const handleParkDelete = async (e) => {
        e.preventDefault();
        const payload = {
            listId,
            parkId: e.target.value
        };

        const deletedPark = await dispatch(deleteListParkRef(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

        if (deletedPark) {
            history.push(`/lists/${listId}`);
        }
    }

    const editOrCancelClick = () => {
        if (showForm === false) {
            setTitle(list[0]?.title);
            setDescription(list[0]?.description);
            setShowForm(true);
        } else if (showForm === true) {
            setTitle(list[0]?.title);
            setDescription(list[0]?.description);
            setShowForm(false);
        }
    }

    const parksMap = (
        <div className='list-detail-parks'>
            {parks.map(park => (
                <div key={park.id} className='park-card-individual'>
                    <div className='park-delete-button-container'>
                        <div>
                            <button className='park-delete-button' value={park.id} onClick={handleParkDelete}>X</button>
                        </div>
                    </div>
                    <ParkCard park={park} className='park-card-comp' />
                </div>
            ))}
        </div>
    )

    const noParks = (
        <div className='no-parks-block'>
            <h2>There are no parks to display</h2>
            <Link to='/parks'>
                <button className='explore-parks-button'>Explore Parks</button>
            </Link>
        </div>
    )

    if (list[0]?.userId !== userId) {
        history.push('/')
    }

    return (
        <div className='list-detail-page'>
            <div className='list-header'>
                <div className='list-detail-header'>
                    <div>
                        <h1>{list[0]?.title}</h1>
                        <h3>{list[0]?.description}</h3>
                    </div>
                    <div className='list-detail-header-button'>
                        <button className='mod-list-button' onClick={editOrCancelClick}>Edit List</button>
                        <button className='mod-list-button' onClick={handleListDelete}>Delete List</button>
                    </div>
                </div>
                <div className='edit-container'>
                    {showForm &&
                        <div className='edit-form-container'>
                            <h3>Edit List</h3>
                            <ul>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <form className='edit-form'>
                                <input
                                    type='text'
                                    placeholder='Title'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                                <input
                                    type='text'
                                    placeholder='Description'
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                                <div>
                                    <button className='edit-form-buttons' onClick={handleEditSubmit}>Submit</button>
                                    <button className='edit-form-buttons' onClick={handleEditCancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>
            {parks.length ? parksMap : noParks}
        </div>
    )
};

export default ListDetailView;
