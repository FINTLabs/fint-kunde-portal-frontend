import {ADD_ENTITIES, GET_ENTITIES_ERROR} from "./types";


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
