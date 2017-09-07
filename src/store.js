import {createStore, applyMiddleware} from 'redux';
import CombinedReducer from './reducers/combinedReducer';
import thunk from 'redux-thunk';


const store = createStore(
    CombinedReducer,
    {},
    applyMiddleware(thunk)
);

export default store;