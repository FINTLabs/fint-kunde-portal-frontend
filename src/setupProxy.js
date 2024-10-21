const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/api', {
        target: 'http://fint-kunde-portal-backend:8080',
        changeOrigin: true
    }));

    app.use(createProxyMiddleware('/services', {
        target: 'http://localhost:8081/',
        changeOrigin: true
    }));

    app.use(createProxyMiddleware('/consent-admin', {
        target: 'http://fint-samtykke-admin-backend:8080',
        changeOrigin: true
    }));
};
