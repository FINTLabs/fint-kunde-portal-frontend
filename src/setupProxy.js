const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("Initializing proxy middleware..."); // Log when the proxy is being set up

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://fint-kunde-portal-backend:8080',
            changeOrigin: true,
            secure: true,
            logLevel: 'debug',  // This will log debug-level details to the console
            onProxyReq: (proxyReq, req, res) => {
                console.log(`Proxying request: ${req.method} ${req.url}`); // Log incoming requests to be proxied
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log(`Received response from target: ${proxyRes.statusCode}`); // Log response status from the target server
            },
            onError: (err, req, res) => {
                console.error(`Error occurred while proxying ${req.method} ${req.url}:`, err); // Log any proxy errors
            }
        })
    );

    console.log(`Proxy setup complete, proxying to ${baseURL}`); // Log when the setup is done
};

const baseURL = 'http://fint-kunde-portal-backend:8080';
