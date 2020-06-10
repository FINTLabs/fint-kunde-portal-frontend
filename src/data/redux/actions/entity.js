import {ADD_COMPONENT_CONFIGURATION, GET_ENTITIES_ERROR} from "./types";


export function fetchEntitiesSuccess(jsonData) {
    return {
        type: ADD_COMPONENT_CONFIGURATION,
        payload: jsonData
    }
}


export function fetchEntitiesError() {
    return {
        type: GET_ENTITIES_ERROR,
    }
}
