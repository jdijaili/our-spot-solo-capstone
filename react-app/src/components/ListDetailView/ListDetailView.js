import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getList } from '../../store/lists';
import { getParksForList } from '../../store/parks';
import './ListDetailView.css'

const ListDetailView = () => {
    const dispatch = useDispatch();
    const { listId } = useParams();

    useEffect(() => {
        dispatch(getParksForList(listId));
        // dispatch(getList(listId));
    }, [dispatch]);

    return(
        <>
            <h1>list detail view</h1>
        </>
    )
};

export default ListDetailView;
