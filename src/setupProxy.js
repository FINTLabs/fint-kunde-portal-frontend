const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', {target: 'http://fint-kunde-portal-backend:8080', secure: false, cors: false}));
};

//beta: https://kunde-beta.felleskomponent.no/