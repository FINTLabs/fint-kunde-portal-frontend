import {
    ADD_ACCESS_PACKAGE, ADD_ENTITIES,
    GET_ACCESS_PACKAGES, GET_ENTITIES_ERROR,
    UPDATE_ACCESS_PACKAGE, UPDATE_SELECTED_COMPONENTS,
    UPDATE_SELECTED_FOR_EDITING_PACKAGE
} from "./types";


export function fetchEntitiesSuccess(jsonData) {
    return {
        type: ADD_ENTITIES,
        payload: jsonData
    }
}


export function fetchEntitiesError() {
    return {
        type: GET_ENTITIES_ERROR,
    }
}
