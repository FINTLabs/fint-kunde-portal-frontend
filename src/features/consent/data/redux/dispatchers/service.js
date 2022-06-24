import ConsentApi from "../../ConsentApi";
import {createServiceSuccess, fetchServiceError, fetchServiceSuccess} from "../actions/service"

export function fetchServices() {

    return (dispatch) => {
        return ConsentApi.getServices().then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchServiceSuccess(json));
            } else {
                dispatch(fetchServiceError());
            }
        })
    }
}

export function createService(name) {
    console.log("jennifer - in create policy dispatcher",name);
    return function (dispatch) {
        return ConsentApi.createService(name).then(response => {
            dispatch(createServiceSuccess(response));
            return response;
        }).catch(error => {
            throw (error);
        });
    };
}