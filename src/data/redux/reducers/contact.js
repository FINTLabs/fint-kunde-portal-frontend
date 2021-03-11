import {FETCH_CONTACTS_SUCCESS} from "../actions/types";

export default function contact(state = [], action) {
    switch (action.type) {
        case FETCH_CONTACTS_SUCCESS:
            return {
                ...state, contacts: action.payload
            };
        default:
            return state
    }
}
