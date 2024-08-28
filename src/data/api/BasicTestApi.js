class BasicTestApi {

  static runTest(organisationName, test) {
    const request = new Request(`http://fint-test-runner.fintlabs-no.svc.cluster.local:8080/${organisationName}/basic`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(test)
    });
    console.log('Test-runner url:',request.url)

    return fetch(request).then(response => Promise.all([response, response.json()]));

  }

}

export default BasicTestApi;