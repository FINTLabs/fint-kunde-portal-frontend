import {
    ADD_ACCESS_PACKAGE,
    GET_ACCESS_PACKAGES,
    UPDATE_ACCESS_PACKAGE, UPDATE_SELECTED_COMPONENTS,
    UPDATE_SELECTED_FOR_EDITING_PACKAGE
} from "./types";


export function addAccessPackage(accessPackage) {
    return {
        type: ADD_ACCESS_PACKAGE,
        payload: accessPackage
    }
}

export function updateAccessPackage(accessPackage) {
    return {
        type: UPDATE_ACCESS_PACKAGE,
        payload: accessPackage
    }
}
export function getAccessPackage() {
    return {
        type: GET_ACCESS_PACKAGES,
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
