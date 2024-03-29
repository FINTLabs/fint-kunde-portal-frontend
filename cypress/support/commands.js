Cypress.Commands.add('apiIntercept', () => {
    cy.viewport(1000, 1000);
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/me',
    }, {fixture: 'me.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/api/feature',
    }, {fixture: 'features.json'});
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
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/components/organisation/test_no',
    }, {statusCode: 200, fixture: 'components.json'});

    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/assets/test_no/',
    }, {statusCode: 200, fixture: 'assets.json'});
    cy.intercept({
        method: 'PUT',
        url: 'http://localhost:3000/api/assets/test_nr_to_no/',
    }, {statusCode: 200, fixture: 'assets.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/organisations/test_no/asset/primary',
    }, {statusCode: 200, fixture: 'assets-primary.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/organisations/test_no/contacts/technical',
    }, {statusCode: 200, fixture: 'technical.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/organisations/fintlabs_no/asset/primary',
    }, {statusCode: 200, fixture: 'assets-primary.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/organisations/test_no/contacts/legal',
    }, {statusCode: 200, fixture: 'legal.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/contacts',
    }, {statusCode: 200, fixture: 'contacts.json'});
    cy.intercept({
        method: 'DELETE',
        url: 'http://localhost:3000/api/organisations/test_no/contacts/technical/12345654321',
    }, {statusCode: 200});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/feature',
    }, {statusCode: 200, fixture: 'feature.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/assets/test_no/primary',
    }, {statusCode: 200, fixture: 'primary.json'});
    cy.intercept({
        method: 'POST',
        url: 'http://localhost:3000/api/clients/test_no',
    }, {statusCode: 201});
    cy.intercept({
        method: 'POST',
        url: 'http://localhost:3000/api/adapters/test_no',
    }, {statusCode: 201});
    cy.intercept({
        method: 'POST',
        url: 'http://localhost:3000/api/tests/test_no/auth/init/test@client.fintlabs.no',
    }, {statusCode: 204});
    cy.intercept({
        method: 'POST',
        url: 'http://localhost:3000/api/tests/test_no/basic',
    }, {statusCode: 200, fixture: 'basis-test.json'});
    cy.intercept({
        method: 'POST',
        url: 'http://localhost:3000/api/tests/test_no/health',
    }, {statusCode: 200, fixture: 'health.json'});
});

Cypress.Commands.add('goToHome', () => {
        cy.visit('http://localhost:3000');
    }
);

Cypress.Commands.add('setLegal', () => {
    cy.intercept({
        method: 'DELETE',
        url: 'http://localhost:3000/api/organisations/test_no/contacts/legal/0fd519f744fa37a085d6ba8d31896d97',
    }, {statusCode: 200});
    cy.intercept({
        method: 'PUT',
        url: 'http://localhost:3000/api/organisations/test_no/contacts/legal/12345654321',
    }, {statusCode: 200});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/organisations/test_no/contacts/technical',
    }, {statusCode: 200, fixture: 'technical-after-new-legal.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/organisations/test_no/contacts/legal',
    }, {statusCode: 200, fixture: 'legal-after-new-legal.json'});
});
Cypress.Commands.add('removeComponentApiCall', () => {
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/contacts/organisations',
    }, {statusCode: 200, fixture: 'organisations.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/components',
    }, {statusCode: 200, fixture: 'components-after-remove-component.json'});
});
Cypress.Commands.add('removeAdapterFromAssetApiCall', () => {
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/adapters/test_no',
    }, {statusCode: 200, fixture: 'adapters-after-remove-adapter.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/assets/test_no/',
    }, {statusCode: 200, fixture: 'assets-after-remove-adapter.json'});
});
Cypress.Commands.add('removeClientFromAssetApiCall', () => {
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/clients/test_no',
    }, {statusCode: 200, fixture: 'clients-after-remove-client.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/api/assets/test_no/',
    }, {statusCode: 200, fixture: 'assets-after-remove-adapter.json'});
});

// CONSENT
Cypress.Commands.add('getConsentData', () => {
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/samtykke/behandling/test_no',
    }, {statusCode: 200, fixture: 'behandling.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/samtykke/tjeneste/test_no',
    }, {statusCode: 200, fixture: 'tjeneste.json'});
    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/samtykke/behandlingsgrunnlag/',
    }, {statusCode: 200, fixture: 'behandlingsgrunnlag.json'});

    cy.intercept({
        method: 'GET',
        url: 'http://localhost:3000/samtykke/personopplysning/',
    }, {statusCode: 200, fixture: 'personopplysning.json'});
});

