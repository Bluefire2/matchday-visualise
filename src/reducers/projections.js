import {fulfilled, objToMap} from "../util";
import {FETCH_PROJECTIONS} from "../actions/index";

const initialState = objToMap(require('../data/projections.json'));

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTIONS:
            console.log(action.payload);
            return action.payload.probabilities;
        default:
            return state;
    }
};