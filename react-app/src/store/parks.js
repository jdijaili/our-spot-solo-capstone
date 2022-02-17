// ACTIONS
const LOAD_PARKS = 'parks/LOAD_PARKS';

// ACTION CREATORS
const loadParks = (parks) => ({
    type: LOAD_PARKS,
    parks
});

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

// REDUCER
const parksReducer = (state = {}, action) => {
    let updatedState = { ...state }
    switch(action.type) {
        case LOAD_PARKS:
            action.parks.forEach(park => {
                updatedState[park.id] = park;
            });
            return updatedState;
        default:
            return state;
    }
}

export default parksReducer;
