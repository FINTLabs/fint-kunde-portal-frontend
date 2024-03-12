class LinkWalkerApi {

  static getTests(organisationName) {
    const url = `/link-walker/${organisationName}/links`;
    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(response => Promise.all([response, response.json()]));
  }

  static getFailedTestResults(organisationName, id) {
    const url = `/link-walker/${organisationName}/links/${id}?status=FAILED`;
    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(response => Promise.all([response, response.json()]));
  }

  static getAllTestResults(organisationName, id) {
    const url = `/link-walker/${organisationName}/links/${id}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(response => Promise.all([response, response.json()]));
  }

  static addTest(test, organisationName) {
    const request = new Request(`/link-walker/${organisationName}/links`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(test)
    });

    return fetch(request).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

  static clearTests(organisationName) {
    const request = new Request(`/link-walker/${organisationName}/links`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'same-origin',
      //body: JSON.stringify({})
    });

    return fetch(request).then(response => {
      return response;
    }).catch(error => {
      return error;
    });
  }

}

export default LinkWalkerApi;