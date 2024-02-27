describe('Redirect API call to JSON file', () => {
    it.skip('should intercept and redirect the API call to a JSON file', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.visit('/consent');
        cy.getConsentData();
    });


        it.skip('opens and closes the service menu on clicking the Fab button', () => {
            cy.apiIntercept();
            cy.getConsentData();
            cy.get('[data-test="my-fab-component"]').click();
            cy.get('#account-menu').should('be.visible');
            cy.get('body').click(0, 0); // Click somewhere outside to close the menu
            cy.get('#account-menu').should('not.exist');
        });

        it.skip('adds a new service when the "Legg til Tjenester" menu item is clicked', () => {
            cy.getConsentData();
            cy.get('[data-test="my-fab-component"]').click();
            cy.contains('Legg til Tjenster').click();

            const serviceName = 'New Service Test';
            cy.get('#serviceName').type(serviceName);

            // NEEDS MORE WORK HERE this just runs a cancel
            cy.get('.MuiDialogActions-root > :nth-child(1)').click();

            //cy.get('[data-test="add-service-dialog"] [color="primary"]').click();
            // You can add assertions here to ensure the service is added correctly
        });

        it.skip('adds a new reason when the "Legg til Behandlingsgrunnlag" menu item is clicked', () => {
            cy.getConsentData();
            cy.get('[data-test="my-fab-component"]').click();
            cy.contains('Legg til Behandlingsgrunnlag').click();

            const reasonCode = 'RC123';
            const reasonName = 'New Reason Test';

            cy.get('#rCode').type(reasonCode);
            cy.get('#reasonName').type(reasonName);

            // NEEDS MORE WORK HERE this just runs a cancel
            cy.get('.MuiDialogActions-root > :nth-child(1)').click();

            //cy.get('[data-test="add-reason-dialog"] [color="primary"]').click();
            // You can add assertions here to ensure the reason is added correctly
        });

});
