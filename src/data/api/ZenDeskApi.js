export default class ZenDeskApi {

    static getPriority() {
        const url = "/tickets/priority";
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static getType() {
        const url = "/tickets/type";
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }

    static createTicket(ticket) {
        const request = new Request("/tickets", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            mode: 'same-origin',
            body: JSON.stringify(ticket)
        });

        return fetch(request).then(response => {
            return response
        });

    }


}