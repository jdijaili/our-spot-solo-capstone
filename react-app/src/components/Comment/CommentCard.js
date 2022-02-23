import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../store/comments';

const CommentCard = ({ comment, parkId }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const commentUpToDate = Object.values(useSelector(state => state.comments)).filter(stateComment => stateComment.id === comment.id)[0];

    let userId;
    if (user) {
        userId = user.id;
    }
    
    const [errors, setErrors] = useState([]);
    const [commentEdit, setCommentEdit] = useState(comment.commentText);
    const [reply, setReply] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedComment = {
            id: comment.id,
            parkId,
            userId: userId,
            reply,
            comment: commentEdit
        }

        const submittedComment = await dispatch(editComment(editedComment))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
        console.log(submittedComment)
        if (editedComment) {
            setShowForm(false);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const deleteInfo = {
            parkId,
            id: comment.id
        };

        await dispatch(deleteComment(deleteInfo));
    }

    const userButtons = (
        <div>
            <button onClick={e => setShowForm(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )

    return (
        <div>
            <div>
                <p>{comment.username}: {commentUpToDate.commentText}</p>
                <div>
                </div>
            </div>

            <div>
                {userId === comment.userId ? userButtons : ''}
                {showForm &&
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <input
                            value={commentEdit}
                            onChange={e => setCommentEdit(e.target.value)}

                        />
                        <button type='submit'>Edit</button>
                        <button onClick={e => setShowForm(false)}>Cancel</button>
                    </form>
                }
            </div>
        </div>
    )
};

export default CommentCard;
