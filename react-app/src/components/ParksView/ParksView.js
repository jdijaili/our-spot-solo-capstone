import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParks } from '../../store/parks';
import ParkCard from '../ParkCard/ParkCard';
import './ParksView.css'


const ParkView = () => {
    const dispatch = useDispatch();
    const parks = Object.values(useSelector(state => state.parks));

    useEffect(() => {
        dispatch(getParks());
    }, [dispatch]);

    return (
        <>
            <div>
                <h1>- Explore your local parks -</h1>
            </div>
            <div>
                {parks.map(park => (
                    <div key={park.id}>
                        <ParkCard park={park} />
                    </div>
                ))}
            </div>
        </>
    )
};

export default ParkView;
