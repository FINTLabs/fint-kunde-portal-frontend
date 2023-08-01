describe('Redirect API call to JSON file', () => {
    it('should intercept and redirect the API call to a JSON file', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.visit('/samtykk');
        cy.getConsentData();
    });
});
