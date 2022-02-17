import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getParks } from '../../store/parks';
import Comment from '../Comment/Comment';
import './ParkDetailView.css'

const ParkDetailView = () => {
    const { parkId } = useParams();
    const dispatch = useDispatch();

    const parks = Object.values(useSelector(state => state.parks));
    const selectedPark = parks.filter(park => park.id === parseInt(parkId))[0];

    useEffect(() => {
        dispatch(getParks());
    }, [dispatch]);

    return(
        <>
            <h1>{selectedPark?.name}</h1>
            <h3>{selectedPark?.description}</h3>
            <img src={selectedPark?.imageURL} alt={selectedPark?.name}/>
            <div>
                <h2>Comments</h2>
                <Comment parkId={parkId}/>
            </div>

        </>
    )
};

export default ParkDetailView;
