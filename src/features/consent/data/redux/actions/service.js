import {
    FETCH_SERVICE_ERROR,
    FETCH_SERVICE_SUCCESS,
    FETCH_POLICY_SUCCESS,
    FETCH_POLICY_ERROR,
    FETCH_POLICYPURPOSE_SUCCESS,
    FETCH_POLICYPURPOSE_ERROR,
    FETCH_PERSONALDATA_SUCCESS,
    FETCH_PERSONALDATA_ERROR
} from "./types";

export function fetchServiceSuccess(payload) {
    return {
        type: FETCH_SERVICE_SUCCESS,
        payload
    }
}

export function fetchServiceError() {
    return {
        type: FETCH_SERVICE_ERROR
    }
}
export function fetchPolicySuccess(payload) {
    return {
        type: FETCH_POLICY_SUCCESS,
        payload
    }
}

export function fetchPolicyError() {
    return {
        type: FETCH_POLICY_ERROR
    }
}
export function fetchPolicypurposeSuccess(payload) {
    return {
        type: FETCH_POLICYPURPOSE_SUCCESS,
        payload
    }
}

export function fetchPolicypurposeError() {
    return {
        type: FETCH_POLICYPURPOSE_ERROR
    }
}
export function fetchPersonaldataSuccess(payload) {
    return {
        type: FETCH_PERSONALDATA_SUCCESS,
        payload
    }
}

export function fetchPersonaldataError() {
    return {
        type: FETCH_PERSONALDATA_ERROR
    }
}