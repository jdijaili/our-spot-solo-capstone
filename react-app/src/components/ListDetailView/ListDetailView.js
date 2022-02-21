import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getList } from '../../store/lists';
import { getParksForList } from '../../store/parks';
import ParkCard from '../ParkCard/ParkCard';
import './ListDetailView.css'

const ListDetailView = () => {
    const dispatch = useDispatch();
    const { listId } = useParams();

    const parks = Object.values(useSelector(state => state.parks));
    const list = Object.values(useSelector(state => state.lists)).filter(list => list.id === parseInt(listId))[0];

    useEffect(() => {
        dispatch(getParksForList(listId));
        dispatch(getList(listId));
    }, [dispatch]);

    return(
        <>
            <div>
                <h1>{list?.title}</h1>
                <h3>{list?.description}</h3>
            </div>
            <div>
                {parks.map(park => (
                    <ParkCard park={park} key={park.id}/>
                ))}
            </div>
        </>
    )
};

export default ListDetailView;
