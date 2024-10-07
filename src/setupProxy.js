const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://fint-kunde-portal-backend:8080',
            changeOrigin: true,
            secure: true,
            logLevel: 'debug',
        })
    );
};
baseURL = 'http://fint-kunde-portal-backend:8080';