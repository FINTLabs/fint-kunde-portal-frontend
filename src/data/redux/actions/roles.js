import {
    ADD_ROLES_ERROR, ROLE_REQUEST,
    ADD_ROLES_SUCCESS,
    GET_ROLES_ERROR,
    GET_ROLES_SUCCESS,
    SET_ROLE_CONTACT
} from "./types";


export function fetchRolesSuccess(json) {
    return {
        type: GET_ROLES_SUCCESS,
        payload: json
    }
}

export function fetchRolesError() {
    return {
        type: GET_ROLES_ERROR,
    }
}

export function roleRequest() {
    return {
        type: ROLE_REQUEST,
    }
}

export function addRoleSuccess() {
    return {
        type: ADD_ROLES_SUCCESS,
    }
}

export function addRoleError() {
    return {
        type: ADD_ROLES_ERROR,
    }
}

export function setRoleContact(contact) {
    return {
        type: SET_ROLE_CONTACT,
        payload: contact
    }
}
