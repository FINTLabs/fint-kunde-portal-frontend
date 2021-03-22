import {GET_ME_SUCCESS} from "../actions/types";

export default function roles(state = [], action) {

    switch (action.type) {
        case GET_ME_SUCCESS:
            return {
                ...state, me: action.payload
            };
        default:
            return state
    }
}
