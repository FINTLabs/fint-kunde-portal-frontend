import ConsentApi from "../../ConsentApi";
import {
    fetchPolicypurposeError,
    fetchPolicypurposeSuccess,
} from "../actions/service"

export function fetchPolicypurpose() {

    return (dispatch) => {
        return ConsentApi.getPolicypurpose().then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchPolicypurposeSuccess(json));
            } else {
                dispatch(fetchPolicypurposeError());
            }
        })
    }
}
