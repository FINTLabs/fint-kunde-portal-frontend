import {GET_FEATURES_ERROR, GET_FEATURES_SUCCESS,} from "./types";


export function fetchFeaturesSuccess(json) {
    return {
        type: GET_FEATURES_SUCCESS,
        payload: json
    }
}

export function fetchFeaturesError() {
    return {
        type: GET_FEATURES_ERROR,
    }
}


