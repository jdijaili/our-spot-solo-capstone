const CommentCard = ({ comment }) => {

    return (
        <div>
            <p>{comment.username}: {comment.commentText}</p>
        </div>
    )
};

export default CommentCard;
