import ConsentApi from "../../ConsentApi";
import {createServiceSuccess, fetchServiceError, fetchServiceSuccess} from "../actions/service"

export function fetchServices(orgName) {

    return (dispatch) => {
        return ConsentApi.getServices(orgName).then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchServiceSuccess(json));
            } else {
                dispatch(fetchServiceError());
            }
        })
    }
}

export function createService(name, orgName) {
    return function (dispatch) {
        return ConsentApi.createService(name, orgName).then(response => {
            dispatch(createServiceSuccess(response));
            return response;
        }).catch(error => {
            throw (error);
        });
    };
}
