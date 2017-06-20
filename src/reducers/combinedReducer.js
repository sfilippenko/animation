import {combineReducers} from 'redux';
import ball from './ball';
import road from './road';
import common from './common';

export default combineReducers({
    ball,
    road,
    common
});