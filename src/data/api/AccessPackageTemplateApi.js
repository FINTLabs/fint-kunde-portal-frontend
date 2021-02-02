class AccessPackageTemplateApi {

    static getAccessPackageTemplates() {
        const url = `/api/accesspackage/template`;
        return fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
        })
            .then(response => Promise.all([response, response.json()]));
    }
}

export default AccessPackageTemplateApi;