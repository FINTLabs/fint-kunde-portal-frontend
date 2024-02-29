describe('Redirect API call to JSON file', () => {
    beforeEach(() => {
        cy.getConsentData();
    });

    it('should intercept and redirect the API call to a JSON file', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.visit('/consent');
        cy.getConsentData();
    });

    it('FAB is visible and opens the dialog on click', () => {
        // Check if the FAB is visible
        cy.get('button[aria-label="save"]').should('be.visible');

        // Click the FAB to open the dialog
        cy.get('button[aria-label="save"]').click();

        // Check if the dialog is now open
        cy.get('[aria-labelledby="form-dialog-title"]').should('be.visible');
    });

    it('Fills out the form and checks that the save button is enabled, then clicks save', () => {
        cy.get('input#serviceName').type('New Service');
        cy.get('button').contains('Add').should('not.be.disabled');
        // cy.get('button').contains('Add').click();
        cy.get('.MuiDialogActions-root > :nth-child(1)').click();
    });

    it('Check table and according', () => {
        cy.get(':nth-child(1) > #panel1bh-header').should('be.visible');
        cy.get('#samtykkeList').should('not.be.visible');
        cy.get(':nth-child(1) > #panel1bh-header').contains('Cookie Monster').should('be.visible');
        cy.get(':nth-child(1) > #panel1bh-header').contains('Cookie Monster').click();
        cy.get('#samtykkeList').should('be.visible');
    });

    it('check the add behandling button and form', () => {
        cy.get('#addSamtykkeButton').should('be.visible');
        cy.get('#addSamtykkeButton').click();
        cy.get('#form-dialog-title').should('be.visible');

        cy.get('#mui-component-select-personalDataId').should('be.visible');
        cy.get('#mui-component-select-personalDataId').click();
        cy.get('[data-value="no.fint.felles.kompleksedatatyper.personnavn.etternavn"]').click();

        cy.get('#mui-component-select-reasonId').should('be.visible');
        cy.get('#mui-component-select-reasonId').click();
        cy.get('[data-value="1"]').click();

        cy.get('.MuiTextField-root > .MuiInputBase-root').should('be.visible');
        cy.get('.MuiTextField-root > .MuiInputBase-root').type('test');
        cy.get('[name="add"]').click();
    });

    it('check the toggle button', () => {
        cy.get('#samtykkeList').find('li').should('be.visible');
        cy.get('#samtykkeList').find('li').should('have.length', 1);
        cy.get('.PrivateSwitchBase-input').should('not.be.checked');
        cy.get('.PrivateSwitchBase-input').click();
        cy.get('.PrivateSwitchBase-input').should('be.checked');
        cy.get('#samtykkeList').find('li').should('have.length', 4);
    });

    it('check the search field', () => {
        cy.get('.MuiInputBase-input').should('be.visible');
        cy.get('.MuiInputBase-input').type('oscar');
        cy.get(':nth-child(1) > #panel1bh-header').contains('Oscar').should('be.visible');
    });

});
