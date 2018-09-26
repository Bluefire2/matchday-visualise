import {BEGIN_FETCH_PROJECTIONS, FETCH_PROJECTIONS} from "../actions/index";

const initialState = false;

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTIONS:
            return false;
        case BEGIN_FETCH_PROJECTIONS:
            return true;
        default:
            return state;
    }
};