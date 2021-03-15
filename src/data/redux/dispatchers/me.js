import MeApi from "../../api/MeApi";
import {fetchMeError, fetchMeSuccess} from "../actions/me";

export function fetchMe() {

    return (dispatch) => {
        return MeApi.getMe().then((response) => {
            if (response.status === 200) {
                dispatch(fetchMeSuccess(response.data));
            } else {
                dispatch(fetchMeError());
            }
        })
    }
}
