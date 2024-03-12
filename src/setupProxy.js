const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(proxy('/api', { target: 'http://localhost:8081/' }));
//     app.use(proxy('/zendesk', { target: 'http://localhost/' })); // https://kunde-beta.felleskomponent.no/
//     app.use(proxy('/services', { target: 'http://localhost:8081/' }));
//     app.use(proxy('/consent-admin', { target: 'http://localhost:8080/' }));
// };
// baseURL = 'http://localhost:8081/';
// beta: https://kunde-beta.felleskomponent.no/