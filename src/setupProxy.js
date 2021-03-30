const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://host.docker.internal:8080' }));
    app.use(proxy('/tickets', { target: 'http://host.docker.internal:8080' }));
    app.use(proxy('/unleash', { target: 'https://unleash-beta.fintlabs.no/api' }));
};
