import {
    ADD_ACCESS_PACKAGE,
    FETCH_ACCESS_ERROR,
    FETCH_ACCESS_SUCCESS,
    UPDATE_ACCESS_PACKAGES,
    UPDATE_SELECTED_COMPONENTS,
    UPDATE_SELECTED_FOR_EDITING_PACKAGE
} from "./types";

export function fetchAccessSuccess(payload) {
    return {
        type: FETCH_ACCESS_SUCCESS,
        payload
    }
}

export function fetchAccessError() {
    return {
        type: FETCH_ACCESS_ERROR,
    }
}

export function addAccessPackage(accessPackage) {
    return {
        type: ADD_ACCESS_PACKAGE,
        payload: accessPackage
    }
}

export function updateAccessPackages(accessPackage) {
    return {
        type: UPDATE_ACCESS_PACKAGES,
        payload: accessPackage
    }
}

export function setSelectedForEditingPackage(accessPackageId) {
    return {
        type: UPDATE_SELECTED_FOR_EDITING_PACKAGE,
        payload: accessPackageId,
    }
}

export function updateSelectedComponents(selectedComponents) {
    return {
        type: UPDATE_SELECTED_COMPONENTS,
        payload: selectedComponents,
    }
}
