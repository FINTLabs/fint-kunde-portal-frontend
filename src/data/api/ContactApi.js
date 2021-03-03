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
}

export default ContactApi;
