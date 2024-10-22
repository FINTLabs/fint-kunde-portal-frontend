const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app) {
    //app.use(proxy('/api', {target: 'http://fint-kunde-portal-backend:8080', secure: false, cors: false}));
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://fint-kunde-portal-backend:8080',
            secure: false,
            changeOrigin: true,
            onProxyReq: (proxyReq, req, res) => {
                console.log('Proxying request:', req.url);
            },
            onError: (err, req, res) => {
                console.error('Error while proxying request:', err.message);
                res.status(500).send('Proxy error');
            }
        })
    );
};