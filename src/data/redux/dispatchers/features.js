import FeatureToggleApi from "../../api/FeatureToggleApi";
import {fetchFeaturesError, fetchFeaturesSuccess} from "../actions/features";

export function fetchFeatures() {
    return (dispatch) => {
        return FeatureToggleApi.getFeatures().then((response) => {
            if (response.status === 200) {
                dispatch(fetchFeaturesSuccess(response.data));
            } else {
                dispatch(fetchFeaturesError());
            }
        })
    }
}

