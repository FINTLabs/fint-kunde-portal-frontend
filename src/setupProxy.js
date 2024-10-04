const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', {
        target: 'http://fint-kunde-portal-backend:8080',
        changeOrigin: true, // Ensures host header is rewritten to match target
        secure: false,      // Disable SSL verification if needed
        logLevel: 'debug'   // Adds detailed logging for debugging
    }));
};
