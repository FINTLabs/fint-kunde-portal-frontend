import {FETCH_ACCESS_PACKAGE_TEMPLATE_ERROR, FETCH_ACCESS_PACKAGE_TEMPLATE_SUCCESS} from "./types";

export function fetchAccessPackageTemplateSuccess(payload) {
    return {
        type: FETCH_ACCESS_PACKAGE_TEMPLATE_SUCCESS,
        payload
    }
}

export function fetchAccessPackageTemplateError() {
    return {
        type: FETCH_ACCESS_PACKAGE_TEMPLATE_ERROR,

    }
}