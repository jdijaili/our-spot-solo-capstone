import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getAllLists } from '../../store/lists';
import './ListBrowseView.css'

const ListBrowseView = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const lists = Object.values(useSelector(state => state.lists))

    useEffect(() => {
        dispatch(getAllLists(userId));
    }, [dispatch])

    return (
        <div className='list-browse-page'>
            <div className='header'>
                <h1>List Browse View</h1>
                <button className='new-list'>New List</button>
            </div>
            <div>
                {lists.map(list => (
                    <Link to={`/lists/${list.id}`}>
                        <h3>{list.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ListBrowseView;
