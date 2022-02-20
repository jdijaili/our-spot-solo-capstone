import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLists } from '../../store/lists';

const ListDetailView = () => {
    const dispatch = useDispatch();
    const { listId } = useParams();

    useEffect(() => {
        dispatch(getLists(listId));
    }, [dispatch]);

    return(
        <>
            <h1>list view</h1>
        </>
    )
};

export default ListDetailView;
