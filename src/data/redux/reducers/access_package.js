import {
    ADD_ACCESS_PACKAGE, FETCH_ACCESS_ERROR, FETCH_ACCESS_SUCCESS,
    UPDATE_ACCESS_PACKAGES,
    UPDATE_SELECTED_COMPONENTS,
    UPDATE_SELECTED_FOR_EDITING_PACKAGE
} from "../actions/types";

export default function client(state = [], action) {
    switch (action.type) {
        case FETCH_ACCESS_SUCCESS:
            return {...state, accessPackages: action.payload, error:false};
        case FETCH_ACCESS_ERROR:
            return {...state, error: true};
        case ADD_ACCESS_PACKAGE:
            return {
                ...state, accessPackages: action.payload
            };
        case UPDATE_ACCESS_PACKAGES:
            return {
                ...state, accessPackages: action.payload
            };
        case UPDATE_SELECTED_FOR_EDITING_PACKAGE:
            return {
                ...state, selectedForEditing: action.payload
            };
        case UPDATE_SELECTED_COMPONENTS:
            return {
                ...state, accessPackages: action.payload
            };
        default:
            return state
    }
}