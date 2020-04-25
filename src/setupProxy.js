const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/tickets', { target: 'http://localhost:8083/' }));
    app.use(proxy('/api', { target: 'http://localhost:8080/', logLevel: 'debug' }));
    app.use(proxy('/events/api', {
        target: 'https://alpha.felleskomponent.no',
        logLevel: 'debug',
        changeOrigin: false,
        headers: {
            'Host': 'alpha.felleskomponent.no',
        },
    }));
};
