import {FETCH_PROJECTIONS} from "../actions/index";

const initialState = require('../data/standings.json');

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTIONS:
            return action.payload.standings;
        default:
            return state;
    }
};