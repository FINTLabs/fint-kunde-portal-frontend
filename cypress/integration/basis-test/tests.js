describe('Testing basis-test page', () => {
    it('Clicking on menu item for basis-test brings you to correct page', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.get("#menuBurger").click();
        cy.get("#menuList").children().contains("Basistest").click();
        cy.url().should('include', '/basic');
    });
    it('Information about asset should be available', () => {
            cy.get("p").first().should('be.visible');
            cy.get("p").first().contains("En basistest undersøker om alle delene i FINT komponenten");
        }
    );
    it('Component list should have 5 items', () => {
            cy.get("#componentSelector").click();
            cy.get("li")
                .should(
                    ($li) => {
                        expect($li).to.have.length(5)
                    }
                )
        }
    );
    it('Select first component should work by clicking', () => {
            cy.get("li").first().click();
        }
    );
    it('Component chosen is visible', () => {
            cy.get("#componentSelector").contains("Test Kodeverk")
        }
    );
    it('Select production enviroment should work by clicking', () => {
            cy.get("#enviromentSelector").click();
            cy.get("li").first().next().next().click();
        }
    );
    it('Enviroment chosen is visible', () => {
            cy.get("#enviromentSelector").contains("Produksjon")
        }
    );
    it('Select client is posible by clicking', () => {
            cy.get("#clientSelector").click();
            cy.get("li").first().click();
        }
    );
    it('Client chosen is visible', () => {
            cy.get("#clientSelector").contains("Til testing")
        }
    );
    it('Click on run test', () => {
            cy.apiIntercept();
            cy.get("#runBasisTestButton").click();
        }
    );
    it('Confirm test started', () => {
        cy.get("#notifySnackbar").contains("Testen ble startet");
    });
    it('Health status should be OK', () => {
        cy.get("#basisTestTooltip")
            .first()
            .find("span")
            .invoke('attr', 'title')
            .should('contain', 'OK');
    });
    it('Health status should be OK', () => {
        cy.get("#basisTestTooltip")
            .first()
            .find("span")
            .invoke('attr', 'title')
            .should('contain', 'OK');
    });
    it('Health table is visible', () => {
        cy.get("#healthTable").should("be.visible");
    });
    it('Health table contains 4 items', () => {
        cy.get("#healthTable")
            .find("tbody")
            .find('tr')
            .should(
                ($tr) => {
                    expect($tr).to.have.length(4)
                }
            )
    });
    it('Cache table contains 7 items', () => {
        cy.get("#cacheTable")
            .find("tbody")
            .find('tr')
            .should(
                ($tr) => {
                    expect($tr).to.have.length(7)
                }
            )
    });
});
