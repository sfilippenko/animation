import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import RootContainer from './components/RootContainer';
import store from './Store';
require('../styles/app.scss');

ReactDOM.render(
    <Provider store={store}>
        <RootContainer />
    </Provider>
    , document.getElementById('root')
);