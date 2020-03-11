import {CREATE_ACCESS_PACKAGE, DELETE_ACCESS_PACKAGE, GET_ACCESS_PACKAGES} from "./types";


export function createAccessPackage(accessPackage) {
    return {
        type: CREATE_ACCESS_PACKAGE,
        accessPackage
    }
}

export function deleteAccessPackage(accessPackage) {
    return {
        type: DELETE_ACCESS_PACKAGE,
        accessPackage
    }
}
export function getAccessPackage() {
    return {
        type: GET_ACCESS_PACKAGES,
    }
}