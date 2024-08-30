class TestAuthApi {

  static authInit(organisationName, client, test) {

    const request = new Request(`/test-runner/${organisationName}/auth/init/${client}`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(test),
    });


    return fetch(request)
      .then(response => Promise.all([response]));
  }

  static clearAuth(organisationName) {
    const url = `/test-runner/${organisationName}/auth/clear`;
    return fetch(url, {
        method: 'DELETE',
        credentials: 'same-origin'
      })
      .then(response => Promise.all([response]));
  }

}

export default TestAuthApi;