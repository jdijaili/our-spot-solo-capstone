// ACTIONS
const LOAD_PARKS = 'parks/LOAD_PARKS';

const LOAD_PARKS_FOR_LIST = 'lists/LOAD_PARKS_FOR_LIST';

// ACTION CREATORS
const loadParks = (parks) => ({
    type: LOAD_PARKS,
    parks
});

const loadParksForList = (parks) => ({
    type: LOAD_PARKS_FOR_LIST,
    parks
})

// THUNK CREATORS
export const getParks = () => async (dispatch) => {
    const res = await fetch('/api/parks/');

    if (res.ok) {
        const parks = await res.json();
        dispatch(loadParks(parks));
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occured. Please try again.'];
    }
};

export const getParksForList = (list_id) => async (dispatch) => {
    const res = await fetch(`/api/lists/${list_id}/get-parks`);

    if (res.ok) {
        const parks = await res.json();
        dispatch(loadParksForList(parks));
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
const parksReducer = (state = {}, action) => {
    let updatedState = { ...state }
    switch(action.type) {
        case LOAD_PARKS:
            action.parks.forEach(park => {
                updatedState[park.id] = park;
            });
            return updatedState;
        case LOAD_PARKS_FOR_LIST:
            action.parks.forEach(park => {
                updatedState[park.id] = park;
            });
            return updatedState;
        default:
            return state;
    }
}

export default parksReducer;
