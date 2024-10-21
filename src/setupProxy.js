const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://fint-kunde-portal-backend:8080/' }));
    app.use(proxy('/services', { target: 'http://localhost:8081/' }));
    app.use(proxy('/consent-admin', { target: 'http://fint-samtykke-admin-backend:8080' }));
};
// baseURL = 'http://localhost:8081/';
//beta: https://kunde-beta.felleskomponent.no/