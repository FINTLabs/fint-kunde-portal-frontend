import {FETCH_CONTACTS_SUCCESS, UPDATE_CONTACT_SUCCESS} from "../actions/types";

export default function contact(state = [], action) {
    switch (action.type) {
        case FETCH_CONTACTS_SUCCESS:
            return {
                ...state, contacts: action.payload
            };
        case UPDATE_CONTACT_SUCCESS:
            return state
        default:
            return state
    }
}
