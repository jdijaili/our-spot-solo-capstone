import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, postComment } from '../../store/comments';
import './Comment.css'
import CommentCard from './CommentCard';

const Comment = ({ parkId }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const comments = Object.values(useSelector(state => state.comments));
    const parkComments = comments.filter(comment => comment.parkId === parseInt(parkId));

    let userId;
    if (user) {
        userId = user.id;
    }

    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState('');
    const [reply, setReply] = useState(null);

    useEffect(() => {
        dispatch(getComments(parkId))
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            parkId,
            userId: user.id,
            reply,
            comment
        }

        const submittedComment = await dispatch(postComment(newComment))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });

        if (submittedComment) {
            setComment('');
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setComment('');
    };

    return (
        <div>
            {parkComments.map(comment => (
                <CommentCard comment={comment} parkId={parkId} key={comment.id} />
            ))}
            {userId &&
                <form className='new-comment-container' onSubmit={handleSubmit}>
                    <h3>New Comment</h3>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <input
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder='Add a comment...'
                    />
                    <div className='new-comment-buttons'>
                        <button className='comment-button' type='submit'>Add</button>
                        <button className='comment-button' onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            }
        </div>
    )
};

export default Comment;
