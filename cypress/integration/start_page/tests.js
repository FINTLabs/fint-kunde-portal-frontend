describe('Testing start page', () => {
    it('test', () => {
        cy.apiIntercept();
        cy.goToHome();
    });
});