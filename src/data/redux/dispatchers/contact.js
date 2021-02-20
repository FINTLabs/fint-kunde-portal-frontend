import {fetchContactError, fetchContactsSuccess, updateKontaktSuccess} from "../actions/contacts";
import ContactApi from "../../api/ContactApi";

export function fetchContacts() {
    return (dispatch) => {
        return ContactApi.fetchContacts().then(([response, json]) => {
            if (response.status === 200) {
                dispatch(fetchContactsSuccess(json));
            } else {
                dispatch(fetchContactError());
            }
        })
    }
}

export function updateContact(kontakt) {
    return function (dispatch) {
        return ContactApi.updateContact(kontakt).then(response => {
            dispatch(updateKontaktSuccess(response));
            return response;
        }).catch(error => {
            throw (error);
        });
    };
}

