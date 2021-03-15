import {
  fetchLinkWalkerTestsError,
  fetchLinkWalkerTestsSuccess,
} from "../actions/linkwalker";
import LinkWalkerApi from "../../api/LinkWalkerApi";

export function fetchLinkWalkerTests(organisation) {

  return (dispatch) => {
    return LinkWalkerApi.getTests(organisation).then(([response, json]) => {
      if (response.status === 200) {
        dispatch(fetchLinkWalkerTestsSuccess(json));
      } else {
        dispatch(fetchLinkWalkerTestsError());
      }
    })
  }
}