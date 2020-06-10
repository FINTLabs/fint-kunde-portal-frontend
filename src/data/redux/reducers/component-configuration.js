import {ADD_COMPONENT_CONFIGURATION} from "../actions/types";

export default function component_configuration(state = [], action) {
    switch (action.type) {
        case ADD_COMPONENT_CONFIGURATION:
            return {
                ...state, componentConfiguration: action.payload
            };
        default:
            return state
    }
}