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

    const userId = useSelector(state => state.session.user.id);
    const parks = Object.values(useSelector(state => state?.parks));
    const list = Object.values(useSelector(state => state?.lists)).filter(list => list.id === parseInt(listId));
    const id = list[0]?.id;

    useEffect(() => {
        dispatch(getList(listId));
        dispatch(getParksForList(listId));
    }, [dispatch]);


    const [title, setTitle] = useState(list[0]?.title);
    const [description, setDescription] = useState(list[0]?.description);
    const [errors, setErrors] = useState([]);
    const [showForm, setShowForm] = useState(false);


    const handleEditSubmit = async (e) => {
        e.preventDefault();

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
    };

    const handleEditCancel = () => {
        setTitle(list.title);
        setDescription(list.description);
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
            history.push(`/lists/user/${userId}`);
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

    const editAndDeleteClick = () => {
        if (showForm === false) {
            setShowForm(true);
        } else if (showForm === true) {
            setTitle(list[0]?.title);
            setDescription(list[0]?.description);
            setShowForm(false);
        }
    }

    const parksMap = (
        <div className='parks-browse-cards'>
            {parks.map(park => (
                <div key={park.id} className='park-card-individual'>
                    <div className='park-delete-button-container'>
                        <div>
                            <button className='park-delete-button' value={park.id} onClick={handleParkDelete}>X</button>
                        </div>
                    </div>
                    <ParkCard park={park} className='park-card-comp'/>
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

    return (
        <div className='list-detail-page'>
            <div className='list-header'>
                <div className='list-detail-header'>
                    <div>
                        <h1>{list[0]?.title}</h1>
                        <h3>{list[0]?.description}</h3>
                    </div>
                    <div className='list-detail-header-button'>
                        <button className='mod-list-button' onClick={editAndDeleteClick}>Edit List</button>
                        <button className='mod-list-button' onClick={handleListDelete}>Delete List</button>
                    </div>
                </div>

                {showForm &&
                    <div className='edit-form-container'>
                        <form className='edit-form'>
                            <h3>Edit List</h3>
                            <input
                                value={title}
                                onChange={e => {
                                    setTitle(e.target.value)
                                    console.log(title)
                                }}
                            />
                            <input
                                type='text'
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
            {parks.length ? parksMap : noParks}
        </div>
    )
};

export default ListDetailView;
