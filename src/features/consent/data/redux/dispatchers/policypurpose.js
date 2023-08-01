import ConsentApi from "../../ConsentApi";
import {
    createPolicypurposeSuccess,
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

export function createPolicypurpose(name, code) {
    return function (dispatch) {
        return ConsentApi.createPolicypurpose(name,code).then(response => {
            dispatch(createPolicypurposeSuccess(response));
            return response;
        }).catch(error => {
            throw (error);
        });
    };
}


