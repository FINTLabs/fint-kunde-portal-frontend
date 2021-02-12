Cypress.Commands.add('apiIntercept', () => {
    cy.viewport(1000, 1000);
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/me',
    }, {fixture: 'me.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/contacts/organisations',
    }, {statusCode: 200, fixture: 'organisations.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/config/client',
    }, {statusCode: 200, fixture: 'client.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/adapters/test_no',
    }, {statusCode: 200, fixture: 'adapters.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/clients/test_no',
    }, {statusCode: 200, fixture: 'clients.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/components',
    }, {statusCode: 200, fixture: 'components.json'});
});

Cypress.Commands.add('goToHome', () => {
        cy.visit('http://localhost:3000');
    }
);