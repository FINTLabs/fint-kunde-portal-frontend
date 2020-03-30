const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/tickets', { target: 'http://localhost:8083/' }));
    app.use(proxy('/api', { target: 'http://host.docker.internal:8080', logLevel: 'debug' }));
    app.use(proxy('/events/api', {
        target: 'http://08238577.eu.ngrok.io',
        logLevel: 'debug',
        changeOrigin: false,
        headers: {
            'Host': '08238577.eu.ngrok.io',
        },
    }));
};
