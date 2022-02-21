import { csrfFetch } from "../helpers";

// ACTIONS
const LOAD_ALL_LISTS = 'lists/LOAD_ALL_LISTS'

const LOAD_LIST = 'lists/LOAD_LIST';

const CREATE_LIST = 'lists/CREATE_LIST';

// ACTION CREATORS
const loadAllLists = (lists) => ({
    type: LOAD_ALL_LISTS,
    lists
});

const loadList = (list) => ({
    type: LOAD_LIST,
    list
});

const createList = (list) => ({
    type: CREATE_LIST,
    list
})

// THUNK CREATORS
export const getAllLists = (userId) => async (dispatch) => {
    const res = await fetch(`/api/lists/user/${userId}`);

    if (res.ok) {
        const lists = await res.json();
        dispatch(loadAllLists(lists))
    }
};

export const getList = (listId) => async (dispatch) => {
    const res = await fetch(`/api/lists/${listId}`);

    if (res.ok) {
        const list = await res.json();
        dispatch(loadList(list));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
};

export const postList = ({ userId, title, description }) => async (dispatch) => {
    const res = await csrfFetch(`/api/lists/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: userId,
            title,
            description
        })
    });

    if (res.ok) {
        const list = await res.json();
        dispatch(createList(list));
        return true
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
const reducer = (state = {}, action) => {
    let updatedState = { ...state };
    switch(action.type) {
        case LOAD_ALL_LISTS:
            action.lists.forEach(list => {
                updatedState[list.id] = list
            });
            return updatedState;
        case LOAD_LIST:
            // action.list.forEach(park => {
            //     updatedState[park.id] = park
            // });
            updatedState[action.list.id] = action.list
            return updatedState;
        case CREATE_LIST:
            updatedState[action.list.id] = action.list
        default:
            return updatedState;
    }
}

export default reducer
