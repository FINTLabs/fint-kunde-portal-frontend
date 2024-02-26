const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:8080/' }));
    app.use(proxy('/tickets', { target: 'http://localhost:8083/' }));
    app.use(proxy('/services', { target: 'http://localhost:8081/' }));
    // app.use(proxy('/consentadmin', { target: 'https://kunde-beta.felleskomponent.no/' }));
    app.use(proxy('/consent-admin', { target: 'http://localhost:8090/' }));
    app.use(proxy('/feature', { target: 'https://unleashed-beta.fintlabs.no/api' }));

};
