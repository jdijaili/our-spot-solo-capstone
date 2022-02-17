const CommentCard = ({ comment }) => {
    console.log(comment)
    return (
        <div>
            <p>{comment.username}: {comment.commentText}</p>
        </div>
    )
};

export default CommentCard;
