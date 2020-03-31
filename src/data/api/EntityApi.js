class EntityApi {

    static getEntities() {
        const url = "/api/components/entities";

        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'x-org-id': 'fintlabs.no',
                'x-client': 'fintlabs.no'
            }
        })
            .then(response => Promise.all([response, response.json()]));
    }
}

export default EntityApi;