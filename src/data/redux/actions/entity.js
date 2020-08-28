import {GET_ENTITIES_SUCSESS, GET_ENTITIES_ERROR} from "./types";


export function fetchEntitiesSuccess(jsonData) {
    return {
        type: GET_ENTITIES_SUCSESS,
        payload: jsonData
    }
}


export function fetchEntitiesError() {
    return {
        type: GET_ENTITIES_ERROR,
    }
}
