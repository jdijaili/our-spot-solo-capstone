import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists } from '../../store/lists';

const ListDetailView = () => {
    const dispatch = useDispatch()
    const id = useSelector(state => state.session.user.id);

    useEffect(() => {
        dispatch(getLists(1));
    }, [dispatch]);

    return(
        <>
        </>
    )
};

export default ListDetailView;
