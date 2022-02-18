// ACTIONS
const LOAD_LISTS = 'comments/LOAD_LISTS';

// ACTION CREATORS
const loadLists = (lists) => ({
    type: LOAD_LISTS,
    lists
});

// THUNK CREATORS
export const getLists = () => async (dispatch) => {
    const res = await fetch('/api/lists/');

    if (res.ok) {
        const lists = res.json();
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

// REDUCER
const reducer = (state = {}, action) => {
    let updatedState = { ...state };
    switch(action.type) {
        case LOAD_LISTS:
            action.lists.forEach(list => {
                updatedState[list.id] = list;
            });
            return updatedState;
        default:
            return updatedState;
    }
}

export default reducer
