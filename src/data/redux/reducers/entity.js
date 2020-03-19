import {
    ADD_ACCESS_PACKAGE, ADD_ENTITIES,
    GET_ACCESS_PACKAGES, GET_ENTITIES_ERROR,
    UPDATE_ACCESS_PACKAGE, UPDATE_SELECTED_COMPONENTS,
    UPDATE_SELECTED_FOR_EDITING_PACKAGE
} from "../actions/types";

export default function client(state = [], action) {
    switch (action.type) {
        case ADD_ENTITIES:
            return {
                ...state, entities: action.payload._embedded._entries
            };
        default:
            return state
    }
}