import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import component from "../reducers/component";
import client from "../reducers/client";
import organisation from "../reducers/organisation";
import adapter from "../reducers/adapter";
import contact from "../reducers/contact";
import asset from "../reducers/asset";
import linkwalker from "../reducers/linkwalker";

const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        client,
        component,
        organisation,
        adapter,
        contact,
        asset,
        linkwalker,
    }),
    /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware, logger))
);

export default store;