import axios from "axios";

class ContactApi {

  static fetchContacts() {
    const url = "/api/contacts";
    return fetch(url, {
        method: "GET",
        credentials: "same-origin"
      })
      .then(response => Promise.all([response, response.json()]));
  }

  static fetchContactOrganisatons() {
    const url = "/api/contacts/organisations";
    return fetch(url, {
      method: "GET",
      credentials: "same-origin"
    }).then(response => {
      return response;
    });
  }

  static getContactByNin(nin) {
    return axios.get(`/api/contacts/${nin}`);
  }
}

export default ContactApi;
