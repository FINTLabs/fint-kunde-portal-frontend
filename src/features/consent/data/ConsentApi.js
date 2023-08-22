import {fetchPolicypurpose} from "./redux/dispatchers/policypurpose";

class ConsentApi {

    static getServices(orgName) {
        const url = `/consentadmin/tjeneste/${orgName}`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static getPolicies(orgName) {
        const url = `/consentadmin/behandling/${orgName}`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }


    static getPolicypurpose() {
        const url = `/consentadmin/behandlingsgrunnlag/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static getPersonaldata() {
        const url = `/consentadmin/personopplysning/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static setActive(policy) {
        var setTo = true;
        if(policy.aktiv) setTo = false;

        const request = new Request(`/consentadmin/behandling/${policy.id}/${setTo}`, {
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
        const request = new Request(`/consentadmin/behandling/${orgName}`, {
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

        const request = new Request(`/consentadmin/tjeneste/${orgName}`, {
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