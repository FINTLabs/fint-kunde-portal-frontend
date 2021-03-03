import {FETCH_CONTACTS_ERROR, FETCH_CONTACTS_SUCCESS } from "./types";

export function fetchContactsSuccess(payload) {
    return {
        type: FETCH_CONTACTS_SUCCESS,
        payload
    }
}

export function fetchContactError() {
    return {
        type: FETCH_CONTACTS_ERROR
    }
}
