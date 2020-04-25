class LogApi {

  static fetchLog(environment, organisation, query) {

    const url = `/events/api/${organisation}/${query}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      })
      .then(response => Promise.all([response, response.json()]));
  }

  static fetchLogById(corrId) {
    return fetch(`/events/api/id/${corrId}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => Promise.all([response, response.json()]));
  }
}
export default LogApi;
