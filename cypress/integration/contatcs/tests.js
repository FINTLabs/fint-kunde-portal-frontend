describe('Testing contacts page', () => {
    it('Clicking on menu item for contatcs brings you to correct page', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.get("#menuBurger").click();
        cy.get("#menuList").children().contains("Kontakter").click();
        cy.url().should('include', '/contacts');
    });
    it('Legal contact should show as expected', () => {
            cy.get("#legalContactNameField").contains("Test Bruker");
        }
    );
    it('Legal contacts should be one row', () => {
            cy.get("#legalContactList")
                .find('li')
                .should(
                    ($tr) => {
                        expect($tr).to.have.length(1)
                    }
                )
        }
    );
    it('Technical contacts should show as expected', () => {
            cy.get("#technicalContactsList").contains("Test Nummer 2");
        }
    );
    it('Technical contacts should be two rows', () => {
            cy.get("#technicalContactsList")
                .find('li')
                .should(
                    ($tr) => {
                        expect($tr).to.have.length(2)
                    }
                )
        }
    );
    it('Information about contacts should be available', () => {
            cy.get("p").first().should('be.visible');
        }
    );
    it('Fab is visible', () => {
        cy.get("#addContactFab").should("is.visible");
    });
    it('Clicking fab works', () => {
        cy.get("#addContactFab").click();
    });
    it('Placeholder is visible and contains text', () => {
        cy.get('#addContactSearchField').invoke('attr', 'placeholder').should('contain', 'Søk på etternavn')

    });
    it('Searchfield works', () => {
        cy.get('#addContactSearchField').type("Fire")

    });
    it('Search results contain one match', () => {
        cy.get("#addContactSearchResult").find('li')
            .should(
                ($tr) => {
                    expect($tr).to.have.length(1)
                }
            )
    });
    it('Clicking add contact button opens dialog', () => {
        cy.get("#addContactButton").click();
    });
    it('Alert field is visible after add click', () => {
        cy.get("#addContactInformationBox").should("be.visible");
    });
    it('Confirming adding user', () => {
        cy.get("#confirmAddContactButton").click();
    });
    it('Confirming adding user pop up displayed with correct name', () => {
        cy.get("#notifySnackbar").should('be.visible');
        cy.get("#notifySnackbar").contains('Test Bruker Fire ble lagt til');

    });
    it('Close button should close the pop up', () => {
        cy.get("#closeContactAddExisting").click();
        cy.get("#addContactInformationBox").should("not.exist");
    });
    it('Click on remove user should give pop up to confirm', () => {
        cy.get("#removeUserButton").first().click();
        cy.get("#warning-dialog-content").should("be.visible");
    });
    it('Warning dialog content should have the user name to remove visible', () => {
        cy.get("#warning-dialog-content").contains("Test Testesen");
    });
    it('Confirming removing user should give a popup that contains confirmation', () => {
        cy.get("#confirm").click();
        cy.get("#notifySnackbar").contains("Test Testesen");
    });
    it('Confirming removing user should give a popup that contains confirmation', () => {
        cy.get("#notifySnackbar").contains("Test Testesen ble fjernet");
    });
    it('Setting a person as legal by clicking the legal button works', () => {
        cy.setLegal();
        cy.get("#changeLegalButton").click();
    });
    it('Legal contact should show as other user', () => {
            cy.get("#legalContactNameField").contains("Testesen");
        }
    );
});