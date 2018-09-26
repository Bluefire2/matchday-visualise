import {SET_LEAGUE} from "../actions/index";

const initialState = 'BRASILEIRAO';

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LEAGUE:
            return action.payload;
        default:
            return state;
    }
};