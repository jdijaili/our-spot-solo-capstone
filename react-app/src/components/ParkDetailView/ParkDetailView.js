import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { addListParkRef, getAllLists } from '../../store/lists';
import { getParks } from '../../store/parks';
import Comment from '../Comment/Comment';
import './ParkDetailView.css'

const ParkDetailView = () => {
    const { parkId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user.id);
    const lists = Object.values(useSelector(state => state.lists));
    const parks = Object.values(useSelector(state => state.parks));
    const selectedPark = parks.filter(park => park.id === parseInt(parkId))[0];

    const [listId, setListId] = useState(lists[0]?.id);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getParks());
        dispatch(getAllLists(userId))
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const listParkRef = {
            listId,
            parkId
        };

        const addedPark = await dispatch(addListParkRef(listParkRef))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

        if (addedPark) {
            console.log('success')
            // TODO: #32 add animation to display success
        }
    };

    return (
        <>
            <h1>{selectedPark?.name}</h1>
            <h3>{selectedPark?.description}</h3>
            <img src={selectedPark?.imageURL} alt={selectedPark?.name} />
            {userId &&
                <div>
                    <h2>Add to list</h2>
                    <form onSubmit={handleSubmit}>
                        <select onChange={e => setListId(e.target.value)}>
                            {lists.map(list => (
                                <option value={list.id} key={list.id}>{list.title}</option>
                            ))}
                        </select>
                        <button type='submit'>Add</button>
                    </form>
                </div>
            }
            <div>
                <h2>Comments</h2>
                <Comment parkId={parkId} />
            </div>

        </>
    )
};

export default ParkDetailView;
