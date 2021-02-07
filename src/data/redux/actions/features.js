import {GET_FEATURES, GET_FEATURES_ERROR, GET_FEATURES_SUCCESS} from "./types";


export function fetchFeatures() {
    return {
        type: GET_FEATURES
    }
}

export function fetchFeaturesSuccess(payload) {
    return {
        type: GET_FEATURES_SUCCESS,
        payload
    }
}

export function fetchFeaturesError(payload) {
    return {
        type: GET_FEATURES_ERROR,
        payload
    }
}
