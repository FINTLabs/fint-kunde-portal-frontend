class LogApi {

  static fetchLog(organisation, query) {

    const url = `/events/api/${organisation}/${query}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(response => Promise.all([response, response.json()]));
  }
}
export default LogApi;