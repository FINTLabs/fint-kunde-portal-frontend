import RoleApi from "../../api/RoleApi";
import {
    addRoleError, roleRequest,
    addRoleSuccess,
    fetchRolesError,
    fetchRolesSuccess,
    setRoleContact
} from "../actions/roles";
import ContactApi from "../../api/ContactApi";

export function fetchRoles() {
    return (dispatch) => {
        return RoleApi.getRoles().then((response) => {
            if (response.status === 200) {
                dispatch(fetchRolesSuccess(response.data));
            } else {
                dispatch(fetchRolesError());
            }
        })
    }
}

export function addRole(organisationName, nin, role) {
    return (dispatch) => {
        dispatch(roleRequest());
        return RoleApi.addRole(organisationName, nin, role).then(response => {
            if (response.status === 202) {
                ContactApi.getContactByNin(nin)
                    .then(response => {
                        dispatch(setRoleContact(response.data));
                        dispatch(addRoleSuccess());
                    });
            } else {
                dispatch(addRoleError());
            }
        });
    }
}

export function removeRole(organisationName, nin, role) {
    return (dispatch) => {
        dispatch(roleRequest());
        return RoleApi.removeRole(organisationName, nin, role).then(response => {
            if (response.status === 202) {
                ContactApi.getContactByNin(nin)
                    .then(response => {
                        dispatch(setRoleContact(response.data));
                        dispatch(addRoleSuccess());
                    });
            } else {
                dispatch(addRoleError());
            }
        });
    }
}
