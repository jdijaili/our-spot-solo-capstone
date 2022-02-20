import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getAllLists } from '../../store/lists';
import './ListBrowseView.css'

const ListBrowseView = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    useEffect(() => {
        dispatch(getAllLists(userId))
    })

    return(
        <div>
            <h1>List Browse View</h1>
        </div>
    )
}

export default ListBrowseView;
