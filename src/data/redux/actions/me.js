import {GET_ME_ERROR, GET_ME_SUCCESS} from "./types";


export function fetchMeSuccess(json) {
    return {
        type: GET_ME_SUCCESS,
        payload: json
    }
}

export function fetchMeError() {
    return {
        type: GET_ME_ERROR,
    }
}
