const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:8080/' }));
    app.use(proxy('/tickets', { target: 'http://localhost:8083/' }));
    app.use(proxy('/services', { target: 'http://localhost:8081/' }));
    app.use(proxy('/policies', { target: 'http://localhost:8081/' }));
    app.use(proxy('/policypurpose', { target: 'http://localhost:8081/' }));
    app.use(proxy('/personaldata', { target: 'http://localhost:8081/' }));
};
