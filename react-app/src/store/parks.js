import { csrfFetch } from "../helpers";

// ACTIONS
const LOAD_PARKS = 'parks/LOAD_PARKS';

const LOAD_PARKS_FOR_LIST = 'lists/LOAD_PARKS_FOR_LIST';

const TRASH_LIST_PARK_REF = 'lists/TRASH_LIST_PARK_REF';

// ACTION CREATORS
const loadParks = (parks) => ({
    type: LOAD_PARKS,
    parks
});

const loadParksForList = (parks) => ({
    type: LOAD_PARKS_FOR_LIST,
    parks
});

const trashListParkRef = (parkId) => ({
    type: TRASH_LIST_PARK_REF,
    parkId
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

export const deleteListParkRef = ({ listId, parkId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/lists/${listId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            list_id: listId,
            park_id: parkId
        })
    });

    if (res.ok) {
        const park = await res.json();
        dispatch(trashListParkRef(park.id));
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

// REDUCER
const parksReducer = (state = {}, action) => {
    let updatedState = { ...state }
    switch (action.type) {
        case LOAD_PARKS:
            action.parks.forEach(park => {
                updatedState[park.id] = park;
            });
            return updatedState;
        case LOAD_PARKS_FOR_LIST:
            let cleanState = {}
            action.parks.forEach(park => {
                cleanState[park.id] = park;
            });
            return cleanState;
        case TRASH_LIST_PARK_REF:
            delete updatedState[action.parkId];
            return updatedState;
        default:
            return state;
    }
}

export default parksReducer;
