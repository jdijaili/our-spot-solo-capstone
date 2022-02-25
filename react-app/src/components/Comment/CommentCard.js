import Cookies from 'js-cookie';
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

        const commentErrors = [];
        const regExp = /[a-zA-Z0-9!@#$%^&*()_+:?/,><\|]/g;

        if (commentEdit.length === 0) commentErrors.push('This field cannot be blank.');
        if (!regExp.test(commentEdit)) commentErrors.push('This field must include valid content.');

        if (commentErrors.length > 0) {
            setErrors(commentErrors);
        } else {
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

            if (submittedComment) {
                setErrors([]);
                setShowForm(false);
            }

        }

    };

    const handleDelete = async (e) => {
        e.preventDefault();
        const deleteInfo = {
            parkId,
            id: comment.id
        };

        await dispatch(deleteComment(deleteInfo));
    };

    const handleEditCancel = () => {
        setCommentEdit(comment.commentText);
        setErrors([]);
        setShowForm(false);
    };

    const userButtons = (
        <div className='comment-button-container'>
            <button className='comment-button' onClick={e => setShowForm(true)}>Edit</button>
            <button className='comment-button' onClick={handleDelete}>Delete</button>
        </div>
    )

    return (
        <div>
            <div className='comment-container'>
                <p className='comment-text'>{comment.username}: {commentUpToDate.commentText}</p>
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
                        <input type="hidden" name="csrf_token" value={Cookies.get('XSRF-TOKEN')} />
                        <input
                            value={commentEdit}
                            onChange={e => setCommentEdit(e.target.value)}
                            required
                        />
                        <div className='comment-button-container'>
                            <button className='comment-button' type='submit'>Submit</button>
                            <button className='comment-button' onClick={handleEditCancel}>Cancel</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
};

export default CommentCard;
