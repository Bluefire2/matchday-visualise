import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from "redux-promise";
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from './reducers';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(ReduxPromise),
    // other store enhancers if any
));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();