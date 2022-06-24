class ConsentApi {

    static getServices() {
        const url = `/services/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static getPolicies() {
        const url = `/policies/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }
    static getPolicypurpose() {
        const url = `/policypurpose/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }
    static getPersonaldata() {
        const url = `/personaldata/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static setActive(policy) {
        const request = new Request(`/policy/${policy.systemId}/${!policy.active}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            credentials: 'same-origin',
        });


        return fetch(request).then(response => {
            // if(response.ok)
            // return response.json();
            console.log("jennifer",response.status);
            return response.status;
        }).catch(error => {
            console.log("jennifer - put request error", error.toString())
            return error;
        });
    }

    static createPolicy(serviceId, reasonId, personalDataId, description) {
        console.log("jennifer create policy api");
        const request = new Request(`/policy/add`, {
            method: 'PUT',
            headers: {
                // 'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                serviceId: serviceId,
                personalDataSystemId: personalDataId,
                policyPurposeSystemId: reasonId,
                description: description,
            })
        });
        return fetch(request).then(response => {
            return response.json();
            // return response.status;
        }).catch(error => {
            return error;
        });
    }

    static createService(name) {
        console.log("jennifer create service api");
        const request = new Request(`/service/add`, {
            method: 'PUT',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                name: name
            })
        });
        return fetch(request).then(response => {
            return response.json();
            // return response.status;
        }).catch(error => {
            return error;
        });
    }

}

export default ConsentApi;