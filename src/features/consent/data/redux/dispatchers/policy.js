import ConsentApi from "../../ConsentApi";
import {fetchPolicySuccess, fetchPolicyError} from "../actions/service"

export function fetchPolicies() {

    return (dispatch) => {
        return ConsentApi.getPolicies().then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchPolicySuccess(json));
            } else {
                dispatch(fetchPolicyError());
            }
        })
    }
}