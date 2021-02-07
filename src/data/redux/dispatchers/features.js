import {fetchAdaptersError} from "../actions/adapter";
import UnleashApi from "../../api/UnleashApi";
import {fetchFeatures, fetchFeaturesSuccess} from "../actions/features";


export function getFeatures() {

    return (dispatch) => {
        dispatch(fetchFeatures());
        return UnleashApi.getFeatures()
            .then(response => {
                if (response.status === 200) {
                    dispatch(fetchFeaturesSuccess(response.data))
                } else {
                    dispatch(fetchAdaptersError(response.data))
                }
            });
    }
}
