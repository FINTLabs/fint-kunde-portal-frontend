import {GET_FEATURES_ERROR, GET_FEATURES_SUCCESS} from "../actions/types";


export default function feature(state = [], action) {
    switch (action.type) {
        case GET_FEATURES_SUCCESS:
            return {...state, features: action.payload, error: false};
        case GET_FEATURES_ERROR:
            return {...state, error: true};
        default:
            return state
    }
}
