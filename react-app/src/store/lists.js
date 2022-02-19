import { csrfFetch } from "../helpers";

// ACTIONS
const LOAD_LISTS = 'lists/LOAD_LISTS';

const CREATE_LISTS = 'lists/CREATE_LISTS';

// ACTION CREATORS
const loadLists = (lists) => ({
    type: LOAD_LISTS,
    lists
});

const createList = (list) => ({
    type: CREATE_LISTS,
    list
})

// THUNK CREATORS
export const getLists = () => async (dispatch) => {
    console.log('before')
    const res = await fetch(`/api/lists/`);
    console.log('after')

    if (res.ok) {
        const lists = await res.json();
        dispatch(loadLists(lists));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
};

// export const createList = ({}) => async (dispatch) => {
//     const res = await csrfFetch('/api/lists/')
// }

// REDUCER
const reducer = (state = {}, action) => {
    let updatedState = { ...state };
    switch(action.type) {
        case LOAD_LISTS:
            console.log(action.lists)
            action.lists.forEach(list => {
                updatedState[list.id] = list
            });
            return updatedState;
        default:
            return updatedState;
    }
}

export default reducer
