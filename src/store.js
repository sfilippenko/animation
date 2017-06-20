import {createStore, applyMiddleware, compose} from 'redux';
import CombinedReducer from './reducers/CombinedReducer';


const store = createStore(
    CombinedReducer,
    {},
    compose(applyMiddleware(store => next => action =>
        typeof action === 'function' ? action(store.dispatch, store.getState) : next(action)))
);

export default store;