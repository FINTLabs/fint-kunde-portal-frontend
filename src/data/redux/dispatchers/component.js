import ComponentApi from "../../api/ComponentApi";
import {
  fetchComponentsError,
  fetchComponentsSuccess
} from "../actions/component";

export function fetchComponents(organisation = undefined) {

  if (organisation) {
    return (dispatch) => {
      return ComponentApi.getOrganisationComponents(organisation).then(([response, json]) => {
        if (response.status === 200) {
          dispatch(fetchComponentsSuccess(json));
        } else {
          dispatch(fetchComponentsError());
        }
      })
    } 
  }

  return (dispatch) => {
    return ComponentApi.getApis().then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchComponentsSuccess(json));
      } else {
        dispatch(fetchComponentsError());
      }
    })
  }
}
