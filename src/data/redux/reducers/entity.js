import {ADD_ENTITIES} from "../actions/types";

export default function client(state = [], action) {
    switch (action.type) {
        case ADD_ENTITIES:
            return {
                ...state, entities: action.payload
            };
        default:
            return state
    }
}