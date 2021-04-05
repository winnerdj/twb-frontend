import {combineReducers} from 'redux';

import signInReducer from '../components/layout/signIn/reducers';
import {adminReducers} from '../components/administration';
import {elemetReducers} from '../components/elements';

const reducers = combineReducers({
    user:signInReducer,
    userManagement: adminReducers.userManagement,
    filters:elemetReducers.filterReducer
})

export default reducers;