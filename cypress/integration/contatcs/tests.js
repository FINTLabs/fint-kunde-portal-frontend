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
    /*
    it('Menu has 10 links', () => {
            cy.apiIntercept();
            cy.get("#menuList")
                .find('a')
                .should(
                    ($tr) => {
                        expect($tr).to.have.length(10)
                    }
                )
        }
    );
    it('Testing menu buttons clicks', () => {
            cy.apiIntercept();
            cy.get("#menuList").children().contains("Kontakter").click();
            cy.url().should('include', '/contacts');
            cy.get("#menuList").children().contains("Komponenter").click();
            cy.url().should('include', '/components');
            cy.get("#menuList").children().contains("Adapter").click();
            cy.url().should('include', '/adapters');
            cy.get("#menuList").children().contains("Klienter").click();
            cy.url().should('include', '/clients');
            cy.get("#menuList").children().contains("Ressurser").click();
            cy.url().should('include', '/assets');
            cy.get("#menuList").children().contains("Basistest").click();
            cy.url().should('include', '/test/basic');
            cy.get("#menuList").children().contains("Relasjonstest").click();
            cy.url().should('include', '/test/linkwalker');
            cy.get("#menuList").children().contains("Opprett support sak").click();
            cy.url().should('include', '/support/issue');
            cy.get("#menuList").children().contains("Logg ut");
            cy.get("#menuList").children().contains("Dashboard").click();
        }
    );
    it('Menu can close', () => {
            cy.apiIntercept();
            cy.get("#menuToolbar")
                .find('button').click();
            cy.get("#HomeMenuButtonText").should('not.be.visible');

        }
    );
    it('organisationSelector exists', () => {
            cy.get("#organisationSelector").should('be.visible');
        }
    );
    it('organisationSelector shows correct organisation when changing', () => {
            cy.get("#organisationSelector").click();
            cy.get('#888888888').click();
            cy.get("#organisationSelector").contains("Test Nummer 2");
            cy.get("#organisationSelector").click();
            cy.get('#999999999').click();
        }
    );
    it('Card "Klienter" should contain correct amount of clients and correct text', () => {
            cy.get("#clientCard").should("contain", "Klienter");
            cy.get("#clientCard").should("contain", "Antall");
            cy.get("#clientCard").should("contain", "2");
        }
    );
    it('Card "Adapter" should contain correct amount of clients and correct text', () => {
            cy.get("#adapterCard").should("contain", "Adapter");
            cy.get("#adapterCard").should("contain", "Antall");
            cy.get("#adapterCard").should("contain", "2");
        }
    );
    it('Card "Komponenter" should contain correct amount of clients and correct text', () => {
            cy.get("#componentCard").should("contain", "Komponenter");
            cy.get("#componentCard").should("contain", "Antall");
            cy.get("#componentCard").should("contain", "5");
        }
    );
    it('Card "Klienter" should take you to correct url', () => {
            cy.get("#clientCard").click();
            cy.url().should('include', '/clients');
            cy.get("#HomeMenuButton").click();
        }
    );
    it('Card "Adapter" should take you to correct url', () => {
            cy.get("#adapterCard").click();
            cy.url().should('include', '/adapters');
            cy.get("#HomeMenuButton").click();
        }
    );
    it('Card "Komponenter" should take you to correct url', () => {
            cy.get("#componentCard").click();
            cy.url().should('include', '/components');
            cy.get("#HomeMenuButton").click();
        }
    );*/
});