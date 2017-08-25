import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import todoListReducer from "../todoList/container/reducer";
import Routes from "../routes/router.js";

const store = createStore(
    combineReducers({
        todoList:todoListReducer
    }),
    compose(
        applyMiddleware(thunk),
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' && process.env.NODE_ENV === 'development') ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    )
);

ReactDOM.render(
<Provider store={store}>
    <Routes />
    </Provider>,
document.getElementById('react-root')
);