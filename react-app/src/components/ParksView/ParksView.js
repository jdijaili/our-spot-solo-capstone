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
        <div className='parks-browse-page'>
            <div className='parks-browse-header'>
                <h1>Explore your local parks</h1>
            </div>
            <div className='parks-browse-cards'>
                {parks.map(park => (
                    <div key={park.id}>
                        <ParkCard park={park} />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ParkView;
