class AccessApi {

    static getAccess(organisation) {
        const url = `/api/accesses/${organisation}/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }
    static setAccess(access, organisation) {
        const url = `/api/accesses/${organisation}/`;
        return fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(access)
        });
    }
    static updateAccess(access, organisation) {
        const url = `/api/accesses/${organisation}/${access.name}`;
        return fetch(url, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(access)
        })
    }
    static deleteAccess(access, organisation) {
        const url = `/api/accesses/${organisation}/${access.name}`;
        return fetch(url, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    }

}

export default AccessApi;