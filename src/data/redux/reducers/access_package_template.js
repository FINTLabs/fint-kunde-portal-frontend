import {FETCH_ACCESS_PACKAGE_TEMPLATE_ERROR, FETCH_ACCESS_PACKAGE_TEMPLATE_SUCCESS} from "../actions/types";

export default function client(state = [], action) {
    switch (action.type) {
        case FETCH_ACCESS_PACKAGE_TEMPLATE_SUCCESS:
            return {...state, templates: action.payload, error:false};
        case FETCH_ACCESS_PACKAGE_TEMPLATE_ERROR:
            return {...state, error: true};
        default:
            return state
    }
}