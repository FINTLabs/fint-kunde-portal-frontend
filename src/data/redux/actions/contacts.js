import {FETCH_CONTACTS_ERROR, FETCH_CONTACTS_SUCCESS, UPDATE_CONTACT_SUCCESS} from "./types";


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

export function updateKontaktSuccess(payload) {
    return {
        type: UPDATE_CONTACT_SUCCESS,
        payload
    }
}
