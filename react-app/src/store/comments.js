import { csrfFetch } from "../helpers";

// ACTIONS
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';

const CREATE_COMMENT = 'comments/CREATE_COMMENT';

const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';

const TRASH_COMMENT = 'comments/TRASH_COMMENT';

// ACTION CREATORS
const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
});

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
});

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
});

const trashComment = (id) => ({
    type: TRASH_COMMENT,
    id
})

// THUNK CREATORS
export const getComments = () => async (dispatch) => {
    const res = await fetch(`/api/comments/`);

    if (res.ok) {
        const comments = await res.json();
        dispatch(loadComments(comments));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
};

export const postComment = ({ parkId, userId, reply, comment }) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${parkId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            park_id: parkId,
            user_id: userId,
            reply,
            commentText: comment
        })
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(createComment(comment));
        return comment;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
};

export const editComment = ({ id, parkId, userId, reply, comment }) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${parkId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id,
            user_id: userId,
            reply,
            commentText: comment
        })
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(updateComment(comment));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
};

export const deleteComment = ({ parkId, id }) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${parkId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(trashComment(id))
    }
}

// REDUCER
const commentsReducer = (state = {}, action) => {
    let updatedState = { ...state };
    switch (action.type) {
        case LOAD_COMMENTS:
            action.comments.forEach(comment => {
                updatedState[comment.id] = comment;
            });
            return updatedState
        case CREATE_COMMENT:
        case UPDATE_COMMENT:
            updatedState[action.comment.id] = action.comment;
            return updatedState;
        case TRASH_COMMENT:
            delete updatedState[action.id]
            return updatedState
        default:
            return updatedState;
    }
}

export default commentsReducer;
