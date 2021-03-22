import {GET_FEATURES_SUCCESS} from "../actions/types";

export default function features(state = [], action) {

    switch (action.type) {

        case GET_FEATURES_SUCCESS: {
            return {
                ...state, features: action.payload
            }
        }
        default:
            return state
    }
}
