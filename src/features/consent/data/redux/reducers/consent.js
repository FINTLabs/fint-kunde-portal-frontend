import {
    FETCH_PERSONALDATA_SUCCESS,
    FETCH_POLICY_SUCCESS,
    FETCH_POLICYPURPOSE_SUCCESS,
    FETCH_SERVICE_SUCCESS
} from "../actions/types";

export default function consent(state = [], action) {

    switch (action.type) {

        case FETCH_SERVICE_SUCCESS: {
            return {
                ...state, services: action.payload
            }
        }
        case FETCH_POLICY_SUCCESS: {
            return {
                ...state, policies: action.payload
            }
        }
        case FETCH_POLICYPURPOSE_SUCCESS: {
            return {
                ...state, policypurpose: action.payload
            }
        }
        case FETCH_PERSONALDATA_SUCCESS: {
            return {
                ...state, personaldata: action.payload
            }
        }
        default:
            return state
    }
}
