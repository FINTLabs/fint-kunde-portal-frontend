import {fetchAccessError, fetchAccessSuccess} from "../actions/access_package";
import AccessApi from "../../api/AccessApi";


export function fetchAccess(organisation) {

    /*return (dispatch) => {
        return AccessApi.getAccess(organisation).then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchAccessSuccess(json));
            } else {
                dispatch(fetchAccessError());
            }
        })
    }*/
}