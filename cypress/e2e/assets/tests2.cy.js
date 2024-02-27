describe('Testing assets page', () => {
    it('Go back to assets page', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.get("#menuBurger").click();
        cy.get("#menuList").children().contains("Ressurser").click();
        cy.url().should('include', '/assets');
    });
    it('Click add FAB gives opens a pop up', () => {
        cy.apiIntercept();
        cy.get("#assetAddFAB").click();
    });
    it('Adding asset name', () => {
        cy.get("#name").type("test.asset");
    });
    it('Adding asset short description', () => {
        cy.get("#description").type("Ressurs beskrivelse");
    });
    it('Adding client', () => {
        cy.apiIntercept();
        cy.get("#addNewAssetButton").click();
    });
    it('Confirm ok by snackbar', () => {
        cy.get("#notifySnackbar").contains("Ressursen 'Ressurs beskrivelse' ble lagt til!");
    });
}   );