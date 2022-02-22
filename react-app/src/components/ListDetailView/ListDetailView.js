import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editList, getList } from '../../store/lists';
import { getParksForList } from '../../store/parks';
import ParkCard from '../ParkCard/ParkCard';
import './ListDetailView.css'

const ListDetailView = () => {
    const dispatch = useDispatch();
    const { listId } = useParams();

    const parks = Object.values(useSelector(state => state?.parks));
    const list = Object.values(useSelector(state => state?.lists)).filter(list => list.id === parseInt(listId));
    const id = list[0]?.id;

    useEffect(async () => {
        await dispatch(getList(listId));
        await dispatch(getParksForList(listId));
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


    return (
        <>
            <div>
                <h1>{list[0]?.title}</h1>
                <h3>{list[0]?.description}</h3>
                <button onClick={e => setShowForm(true)}>Edit List</button>
                <button>Delete</button>

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
                    <ParkCard park={park} key={park.id} />
                ))}
            </div>
        </>
    )
};

export default ListDetailView;
