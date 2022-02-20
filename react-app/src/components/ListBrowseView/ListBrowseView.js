import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllLists } from '../../store/lists';
import './ListBrowseView.css'

const ListBrowseView = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const lists = useSelector(state => state.lists)

    useEffect(() => {
        dispatch(getAllLists(userId));
    }, [dispatch])

    return (
        <div className='list-browse-page'>
            <div className='header'>
                <h1>List Browse View</h1>
                <button className='new-list'>New List</button>
            </div>

        </div>
    )
}

export default ListBrowseView;
