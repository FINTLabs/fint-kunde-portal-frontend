class ConsentApi {

    static getServices(orgName) {
        const url = `/consent-admin/tjeneste/${orgName}`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static getPolicies(orgName) {
        const url = `/consent-admin/behandling/${orgName}`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }


    static getPolicypurpose() {
        const url = `/consent-admin/behandlingsgrunnlag/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static getPersonaldata() {
        const url = `/consent-admin/personopplysning/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static setActive(policy) {
        var setTo = true;
        if(policy.aktiv) setTo = false;

        const request = new Request(`/consent-admin/behandling/${policy.id}/${setTo}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            credentials: 'same-origin',
        });


        return fetch(request).then(response => {
            return response.status;
        }).catch(error => {
            return error;
        });
    }

    static createPolicy(serviceId, reasonId, personalDataId, description, orgName) {
        const request = new Request(`/consent-admin/behandling/${orgName}`, {
            method: 'POST',
            headers: {
                // 'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                aktiv: true,
                formal: description,
                behandlingsgrunnlagIds: [reasonId],
                tjenesteIds: [serviceId],
                personopplysningIds: [personalDataId],
            })
        });
        return fetch(request).then(response => {
            // return response.json();
            return response.status;
        }).catch(error => {
            return error;
        });
    }

    static createService(serviceName, orgName) {
        console.log("Sending a api request with new service name: ", serviceName);

        const request = new Request(`/consent-admin/tjeneste/${orgName}`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                navn: serviceName

            })
        });
        return fetch(request).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    // static createPolicypurpose(name, rCode) {
    //     const request = new Request(`/consentadmin/behandlingsgrunnlag/`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': '*/*',
    //             'Content-Type': 'application/json'
    //         },
    //         credentials: 'same-origin',
    //         body: JSON.stringify({
    //             name: name,
    //             kode: rCode
    //         })
    //     });
    //     return fetch(request).then(response => {
    //         return response.json();
    //         // return response.status;
    //     }).catch(error => {
    //         return error;
    //     });
    // }

}

export default ConsentApi;