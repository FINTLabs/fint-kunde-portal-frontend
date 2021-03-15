import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import component from "../reducers/component";
import client from "../reducers/client";
import organisation from "../reducers/organisation";
import adapter from "../reducers/adapter";
import contact from "../reducers/contact";
import asset from "../reducers/asset";
import roles from "../reducers/roles";
import me from "../reducers/me";
import linkwalker from "../reducers/linkwalker";
import access_package from "../reducers/access_package";
import component_configuration from "../reducers/component-configuration";
import access_package_template from "../reducers/access_package_template";

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
        access_package,
        access_package_template,
        component_configuration,
        roles,
        me
    }),
    composeEnhancers(
        applyMiddleware(thunkMiddleware, logger))
);

export default store;
