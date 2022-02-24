import { csrfFetch } from "../helpers";

// ACTIONS
const LOAD_ALL_LISTS = 'lists/LOAD_ALL_LISTS'

const LOAD_LIST = 'lists/LOAD_LIST';

const CREATE_LIST = 'lists/CREATE_LIST';

const UPDATE_LIST = 'lists/UPDATE_LIST';

const TRASH_LIST = 'lists/TRASH_LIST';

const CREATE_LIST_PARK_REF = 'lists/CREATE_LIST_PARK_REF';

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
});

const updateList = (list) => ({
    type: UPDATE_LIST,
    list
});

const trashList = (listId) => ({
    type: TRASH_LIST,
    listId
});

const createListParkRef = (list) => ({
    type: CREATE_LIST_PARK_REF,
    list
});

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
};

export const editList = ({ id, title, description }) => async (dispatch) => {
    const res = await csrfFetch('/api/lists/edit-list', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id,
            title,
            description
        })
    });

    if (res.ok) {
        const list = await res.json();
        dispatch(updateList(list));
        return true;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
};

export const deleteList = (listId) => async (dispatch) => {
    const res = await csrfFetch('/api/lists/delete-list', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ list_id: listId })
    });

    if (res.ok) {
        dispatch(trashList(listId));
        return true;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

export const addListParkRef = ({ listId, parkId }) => async (dispatch) => {
    const res = await csrfFetch('/api/lists/add-park-ref', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            list_id: listId,
            park_id: parkId
        })
    });

    if (res.ok) {
        const list = await res.json();
        dispatch(createListParkRef(list));
        return true;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
};

// REDUCER
const reducer = (state = {}, action) => {
    let updatedState = { ...state };
    switch (action.type) {
        case LOAD_ALL_LISTS:
            let cleanState = {};
            action.lists.forEach(list => {
                cleanState[list.id] = list;
            });
            return cleanState;
        case LOAD_LIST:
            updatedState[action.list.id] = action.list;
            return updatedState;
        case CREATE_LIST:
        case UPDATE_LIST:
        case CREATE_LIST_PARK_REF:
            updatedState[action.list.id] = action.list;
            return updatedState;
        case TRASH_LIST:
            delete updatedState[action.listId];
            return updatedState;
        default:
            return updatedState;
    }
}

export default reducer
