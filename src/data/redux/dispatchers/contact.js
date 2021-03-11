import {fetchContactError, fetchContactsSuccess } from "../actions/contacts";
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
