import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import projections from './projections';
import standings from './standings';
import league from './league';
import tableLoading from './tableLoading';

const rootReducer = combineReducers({
    state: (state = {}) => state,
    form: formReducer,
    projections,
    standings,
    league,
    tableLoading
});

export default rootReducer;