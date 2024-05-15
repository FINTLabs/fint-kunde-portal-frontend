class LogApi {

  static fetchLog(environment, organisation, query) {

    const url = `/api/events/${organisation}/${environment}/${query}`;
    return fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
      })
  .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return Promise.all([response, response.json()]);
    })
  }

  static fetchLogById(environment, organisation, corrId) {
    return fetch(`/api/events/${organisation}/${environment}/id/${corrId}`, {
      method: 'GET',
      credentials: 'same-origin'
    })
    .then(response => Promise.all([response, response.json()]));
  }
}
export default LogApi;
