import { csrfFetch } from "../helpers";

// ACTIONS
const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';

// ACTION CREATORS
const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments
});

// THUNK CREATORS
export const getComments = (parkId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${parkId}`);

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
}

// REDUCER
const commentsReducer = (state = {}, action) => {
    let updatedState = { ...state };
    switch(action.type) {
        case LOAD_COMMENTS:
            action.comments.forEach(comment => {
                updatedState[comment.id] = comment;
            });
            return updatedState
        default:
            return updatedState;
    }
}

export default commentsReducer;
