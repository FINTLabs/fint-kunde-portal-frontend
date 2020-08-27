import {GET_ENTITIES_SUCSESS} from "../actions/types";

export default function component_configuration(state = [], action) {
    switch (action.type) {
        case GET_ENTITIES_SUCSESS:
            return {
                ...state, componentConfiguration: action.payload
            };
        default:
            return state
    }
}