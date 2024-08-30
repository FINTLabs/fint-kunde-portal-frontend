class BasicTestApi {

  static runTest(organisationName, test) {
    const request = new Request(`/test-runner/${organisationName}/basic`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(test)
    });

    return fetch(request).then(response => Promise.all([response, response.json()]));

  }

}

export default BasicTestApi;