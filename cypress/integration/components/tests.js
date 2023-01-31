describe('Testing components page', () => {
    it('Clicking on menu item for contatcs brings you to correct page', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.get("#menuBurger").click();
        cy.get("#menuList").children().contains("Komponenter").click();
        cy.url().should('include', '/components');
    });
    it('Information about contacts should be available', () => {
            cy.get("p").first().should('be.visible');
            //cy.get("p").first().contains("En komponent er en løsning fra FINT");
        }
    );
    it('Components should show as expected', () => {
            cy.get("#componentList").should('be.visible');
        }
    );
    it('Components list should be 5 lines', () => {
            cy.get("#componentList")
                .find('li')
                .should(
                    ($tr) => {
                        expect($tr).to.have.length(5)
                    }
                )
        }
    );
    it('Clicking remove component button opens dialog', () => {
        cy.get("#componentList").find("button").first().click();
        cy.get('#warning-dialog-content').should('be.visible');
    });
    it('Confirming removing component', () => {
        cy.removeComponentApiCall();
        cy.get("#confirm").click();
    });
    it('Alert field is visible after remove click', () => {
        cy.get("#notifySnackbar").should("be.visible");
    });
    it('Remove Icon should change to add icon', () => {
        cy
            .get("#componentList")
            .find("button")
            .first()
            .invoke('attr', 'aria-label')
            .should('contain', 'Add');
    });
    it('Clicking settings should give a pop up with component settings', () => {
        cy.get("#componentList").find("button").first().next().click();
        cy.get("#form-dialog-title").should('be.visible');
    });
    it('Title should include component name', () => {
        cy.get("#form-dialog-title").contains("Test Kodeverk");
    });
    it('Name should be visible and contain correct value', () => {
        cy.get("#componentNameCell").should("be.visible");
        cy.get("#componentNameCell").contains("Test kodeverk");
    });
    it('Description should be visible and contain correct value', () => {
        cy.get("#componentDescriptionCell").should("be.visible");
        cy.get("#componentDescriptionCell").contains("Test Kodeverk");
    });
    it('Base Path should contain correct value', () => {
        cy.get("#componentBasePathCell").should("be.visible");
        cy.get("#componentBasePathCell").contains("/test/kodeverk");
    });
    it('Open Data should have correct check value', () => {
        cy.get("#componentOpenDataCheckbox").should("not.be.checked");
    });
    it('Common should have correct check value', () => {
        cy.get("#componentCommonCheckbox").should("not.be.checked");
    });
    it('Production should have correct check value', () => {
        cy.get("#componentProductionCheckbox").should("not.be.checked");
    });
    it('In Beta should have correct check value', () => {
        cy.get("#componentInBetaCheckbox").should("be.checked");
    });
    it('PlayWithFint should have correct check value', () => {
        cy.get("#componentPWFCheckbox").should("not.be.checked");
    });
    it('Production should include production link', () => {
        cy.get("#componentProductionCell").contains("https://api.felleskomponent.no/test/kodeverk");
    });
    it('Beta should include production link', () => {
        cy.get("#componentBetaCell").contains("https://beta.felleskomponent.no/test/kodeverk");
    });
    it('PlayWithFint should include production link', () => {
        cy.get("#componentPWFCell").contains("https://play-with-fint.felleskomponent.no/test/kodeverk");
    });
    it('Swagger Production link should include production link', () => {
        cy.get("#componentProductionSwaggerCell").contains("https://api.felleskomponent.no/test/kodeverk/swagger-ui.html");
    });
    it('Swagger Beta link should include production link', () => {
        cy.get("#componentBetaSwaggerCell").contains("https://beta.felleskomponent.no/test/kodeverk/swagger-ui.html");
    });
    it('Swagger PWF link should include production link', () => {
        cy.get("#componentPWFSwaggerCell").contains("https://play-with-fint.felleskomponent.no/test/kodeverk/swagger-ui.html");
    });
    it('Ok button should bring us back and remove the pop up', () => {
        cy.get("#componentOKButton").should("be.visible");
        cy.get("#componentOKButton").click();
        cy.get("#form-dialog-title").should("not.exist");
    });
});