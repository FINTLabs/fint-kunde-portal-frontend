import EntityApi from "../../api/EntityApi";
import {fetchEntitiesError, fetchEntitiesSuccess} from "../actions/entity";

export function fetchEntities() {

    return (dispatch) => {
        return EntityApi.getEntities().then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchEntitiesSuccess(json));
            } else {
                dispatch(fetchEntitiesError());
            }
        })
        }
}