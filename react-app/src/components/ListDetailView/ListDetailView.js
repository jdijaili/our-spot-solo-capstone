import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
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

    return (
        <>
            <div>
                <h1>{list[0]?.title}</h1>
                <h3>{list[0]?.description}</h3>
                <button onClick={e => setShowForm(true)}>Edit List</button>
                <button onClick={handleListDelete}>Delete</button>

                {showForm &&
                    <div>
                        <form>
                            <input
                                value={title}
                                onChange={e => {
                                    setTitle(e.target.value)
                                    console.log(title)
                                }}
                            />
                            <input
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <button onClick={handleEditSubmit}>Submit</button>
                            <button onClick={handleEditCancel}>Cancel</button>
                        </form>
                    </div>
                }
            </div>
            <div>
                {parks.map(park => (
                    <div key={park.id}>
                        <ParkCard park={park} />
                        <button value={park.id} onClick={handleParkDelete}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
};

export default ListDetailView;
