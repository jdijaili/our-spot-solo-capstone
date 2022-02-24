import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addListParkRef, getAllLists } from '../../store/lists';
import { getParks } from '../../store/parks';
import Comment from '../Comment/Comment';
import './ParkDetailView.css'

const ParkDetailView = () => {
    const { parkId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const lists = Object.values(useSelector(state => state.lists));
    const parks = Object.values(useSelector(state => state.parks));
    const selectedPark = parks.filter(park => park.id === parseInt(parkId))[0];

    let userId;
    if (user) {
        userId = user.id;
    }

    const [listId, setListId] = useState(lists[0]?.id);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getParks());
        dispatch(getAllLists(userId))
    }, [dispatch, userId]);

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
            alert('Park successfuly added!')
            // TODO: #32 add animation to display success
        }
    };

    return (
        <div className='park-detail-page'>
            <div className='park-detail-container'>
                <div className='park-detail-info'>
                    <h1>{selectedPark?.name}</h1>
                    <h3>{selectedPark?.description}</h3>
                    <div className='park-detai-image-container'>
                        <img className='park-detail-image' src={selectedPark?.imageURL} alt={selectedPark?.name} />
                    </div>
                </div>
                <div className='list-comment-container'>
                    <div className='comments-container'>
                        <h2>Comments</h2>
                        <Comment parkId={parkId} />
                    </div>
                    {userId &&
                        <div className='park-list-container'>
                            <h2>Add to list</h2>
                            <form className='park-list-form' onSubmit={handleSubmit}>
                                <select onChange={e => setListId(e.target.value)}>
                                    {lists.map(list => (
                                        <option value={list.id} key={list.id}>{list.title}</option>
                                    ))}
                                </select>
                                <button className='park-list-button' type='submit'>Add</button>
                            </form>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
};

export default ParkDetailView;
