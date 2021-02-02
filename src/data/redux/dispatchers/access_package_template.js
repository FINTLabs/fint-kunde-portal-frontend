import AccessPackageTemplateApi from "../../api/AccessPackageTemplateApi";
import {fetchAccessPackageTemplateError, fetchAccessPackageTemplateSuccess} from "../actions/access_package_template";


export function fetchAccessTemplate() {

    return (dispatch) => {
        return AccessPackageTemplateApi.getAccessPackageTemplates().then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchAccessPackageTemplateSuccess(json));
            } else {
                dispatch(fetchAccessPackageTemplateError());
            }
        })
    }
}