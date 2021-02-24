describe('Testing relation-test page', () => {
    it('Clicking on menu item for relation-test brings you to correct page', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.get("#menuBurger").click();
        cy.get("#menuList").children().contains("Relasjonstest").click();
        cy.url().should('include', '/test/linkwalker');
    });
    it('Information about asset should be available', () => {
            cy.contains("En relasjonstest sjekker at alle relasjonene i en komponent virker");
        }
    );

    it('Remove button should exists', () => {
            cy.get("#removeButton").should("be.visible");
        }
    );
    it('Add new test button should exists', () => {
            cy.get("#linkWalkerFAB").should("be.visible");
        }
    );
    it('Click the new test button should open new test window', () => {
            cy.get("#linkWalkerFAB").click();
        }
    );
    it('Select component should show it as selected', () => {
            cy.get("#componentSelector").click();
            cy.get("li").first().click();
            cy.get("#componentSelector").should("contain", "Test Kodeverk");
        }
    );
    it('Select enviroment should show it as selected', () => {
            cy.get("#enviromentSelector").click();
            cy.get("li").first().next().click();
            cy.get("#enviromentSelector").should("contain", "Beta");
        }
    );
    it('Write resource should show work', () => {
            cy.get("#resourceTextField").type("elev");
        }
    );
    it('Select client should show it as selected', () => {
            cy.get("#clientSelector").click();
            cy.get("li").first().click();
            cy.get("#clientSelector").should("contain", "Til testing");
        }
    );
    it('Running test should close pop up and show you results', () => {
            cy.getTest();
            cy.get("#runTestButton").click();
        }
    );
    it('Confirm test started', () => {
        cy.get("#notifySnackbar").contains("Testen ble opprettet");
    });
    it('Time cell should be visible with correct data', () => {
            cy.get("#timeCell").should("be.visible");
            cy.get("#timeCell").should("contain", "24.02.2021 12:56:34");
        }
    );
    it('Resource cell should be visible with correct data', () => {
            cy.get("#resourceUrlCell").should("be.visible");
            cy.get("#resourceUrlCell").should("contain", "https://api.felleskomponent.no/utdanning/elev/elev");
        }
    );
    it('Description of faults cell should be visible with correct data', () => {
            cy.get("#descriptionOfFaultCell").should("be.visible");
            cy.get("#descriptionOfFaultCell").should("be.empty");
        }
    );
    it('Update button should exists', () => {
            cy.get("#updateButton").should("be.visible");
        }
    );
    it('Update button click gives new status', () => {
            cy.updateTest();
            cy.get("#updateButton").click();
            cy.get("#basisTestTooltip")
                .first()
                .find("span")
                .invoke('attr', 'title')
                .should('contain', 'OK');
        }
    );
    it('Delete button click removes tests', () => {
            cy.apiIntercept();
            cy.get("#removeButton").click();
        }
    );
    it('Table contains 0 items after remove', () => {
        cy.get("table")
            .find("tbody")
            .find('tr')
            .should(
                ($tr) => {
                    expect($tr).to.have.length(0)
                }
            )
    });
    it('Confirm test started', () => {
        cy.get("#notifySnackbar").contains("Testloggen ble slette");
    });
});
