import ConsentApi from "../../ConsentApi";
import {fetchPersonaldataError, fetchPersonaldataSuccess} from "../actions/service"

export function fetchPersonaldata() {

    console.log(".......")
    return (dispatch) => {
        return ConsentApi.getPersonaldata().then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchPersonaldataSuccess(json));
            } else {
                dispatch(fetchPersonaldataError());
            }
        })
    }
}