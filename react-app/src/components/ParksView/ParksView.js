import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParks } from '../../store/parks';
import './ParksView.css'


const ParkView = () => {
    const dispatch = useDispatch();
    const parks = useSelector(state => state.parks);

    useEffect(async () => {
        await dispatch(getParks());
    }, []);

    return (
        <>
            <div>
                <h1>- Explore your local parks -</h1>
            </div>
            <div>
                
            </div>
        </>
    )
};

export default ParkView;
