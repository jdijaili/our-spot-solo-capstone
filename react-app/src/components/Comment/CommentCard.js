import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment } from '../../store/comments';

const CommentCard = ({ comment, parkId }) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user.id);
    const commentUpToDate = Object.values(useSelector(state => state.comments)).filter(stateComment => stateComment.id === comment.id)[0];

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
        if (submittedComment) {
            setShowForm(false);
        }
    };

    const editButton = (
        <button onClick={e => setShowForm(true)}>Edit</button>
    )

    return (
        <div>
            <div>
                <p>{comment.username}: {commentUpToDate.commentText}</p>
                <div>
                </div>
            </div>

            <div>
                {userId === comment.userId ? editButton : ''}
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
