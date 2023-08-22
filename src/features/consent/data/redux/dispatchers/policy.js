import ConsentApi from "../../ConsentApi";
import {fetchPolicySuccess, fetchPolicyError} from "../actions/service"
import {createPolicySuccess} from "../actions/service";

export function fetchPolicies(orgName) {
    return (dispatch) => {
        return ConsentApi.getPolicies(orgName).then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchPolicySuccess(json));
            } else {
                dispatch(fetchPolicyError());
            }
        })
    }
}

export function createPolicy(systemId, reasonId, personalDataId, description, orgName) {
    return function (dispatch) {
        return ConsentApi.createPolicy(systemId, reasonId, personalDataId, description, orgName).then(responsePolicy => {
            dispatch(createPolicySuccess(responsePolicy));
            return responsePolicy;
        }).catch(error => {
            throw (error);
        });
    };
}