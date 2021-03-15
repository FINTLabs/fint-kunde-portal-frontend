import {
    ROLE_REQUEST,
    ADD_ROLES_SUCCESS,
    GET_ROLES_SUCCESS,
    SET_ROLE_CONTACT
} from "../actions/types";

export default function roles(state = [], action) {

    switch (action.type) {
        case ROLE_REQUEST: {
            return {
                ...state, loading: true
            }
        }
        case ADD_ROLES_SUCCESS: {
            return {
                ...state, loading: false
            }
        }
        case GET_ROLES_SUCCESS:
            return {
                ...state, roles: action.payload
            };
        case SET_ROLE_CONTACT:
            return {
                ...state, roleContact: action.payload
            }
        default:
            return state
    }
}
