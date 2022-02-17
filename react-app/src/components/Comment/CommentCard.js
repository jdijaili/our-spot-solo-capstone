import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommentCard = ({ comment, parkId }) => {
    const userId = useSelector(state => state.session.user.id);

    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleEdit = () => {
        setShowForm(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const editedComment = {
            parkId,
            userId: userId,
            reply,
            comment
        }

        const submittedComment = await dispatch(postComment(editedComment))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            });
        console.log(submittedComment)
        if (submittedComment) {
            setComment('');
        }
    };

    const editButton = (
        <button onClick={handleEdit}>Edit</button>
    )

    return (
        <div>
            <div>
                <p>{comment.username}: {comment.commentText}</p>
                {userId === comment.id ? editButton : ''}
            </div>
            {showForm &&
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <input
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder='Add a comment...'
                    />
                    <button type='submit'>Add</button>
                    <button onClick={handleCancel}>Cancel</button>
                </form>
            }
        </div>
    )
};

export default CommentCard;
