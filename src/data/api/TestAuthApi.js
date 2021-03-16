class TestAuthApi {

  static authInit(test) {

    const request = new Request(`/api/tests/auth/init`, {
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
    const url = `/api/tests/auth/clear/${organisationName}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin'
      })
      .then(response => Promise.all([response]));
  }

}

export default TestAuthApi;