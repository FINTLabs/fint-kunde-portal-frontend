import ConsentApi from "../../ConsentApi";
import {fetchServiceError, fetchServiceSuccess} from "../actions/service"

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