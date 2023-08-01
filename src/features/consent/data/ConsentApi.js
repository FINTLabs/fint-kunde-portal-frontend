import {fetchPolicypurpose} from "./redux/dispatchers/policypurpose";

class ConsentApi {

    static getServices() {
        const url = `/samtykke/tjeneste`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static getPolicies() {
        const url = `/samtykke/behandling`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }
    static getPolicypurpose() {
        const url = `/samtykke/behandlingsgrunnlag/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }
    static getPersonaldata() {
        const url = `/samtykke/personopplysning/`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static setActive(policy) {
        var setTo = true;
        if(policy.aktiv) setTo = false;

        const request = new Request(`/samtykke/behandling/${policy.id}/${setTo}`, {
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

    static createPolicy(serviceId, reasonId, personalDataId, description) {
        const request = new Request(`/samtykke/behandling/`, {
            method: 'POST',
            headers: {
                // 'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                aktiv: true,
                formal: description,
                behandlingsgrunnlagId: reasonId,
                tjenesteId: serviceId,
                personopplysningId: personalDataId,
            })
        });
        return fetch(request).then(response => {
            // return response.json();
            return response.status;
        }).catch(error => {
            return error;
        });
    }

    static createService(name) {
        const request = new Request(`/samtykke/tjeneste/`, {
            method: 'POST',
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

    static createPolicypurpose(name, rCode) {
        const request = new Request(`/samtykke/behandlingsgrunnlag/`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                name: name,
                kode: rCode
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