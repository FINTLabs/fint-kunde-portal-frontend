describe('Testing assets page', () => {
    it('Clicking on menu item for asset brings you to correct page', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.get("#menuBurger").click();
        cy.get("#menuList").children().contains("Ressurser").click();
        cy.url().should('include', '/assets');
    });
    it('Information about asset should be available', () => {
            cy.get("p").first().should('be.visible');
            //cy.get("p").first().contains("En ressurs er identifikatoren som styrer");
        }
    );
    it('Assets should show as expected', () => {
            cy.get("#assetList").should('be.visible');
        }
    );
    it('Asset list should be 1 lines', () => {
            cy.get("#assetList")
                .find('li')
                .should(
                    ($tr) => {
                        expect($tr).to.have.length(1)
                    }
                )
        }
    );
    it('Clicking edit asset button opens dialog', () => {
        cy.get("#assetList").find("button").first().click();
        cy.get('#form-dialog-title').should('be.visible');
    });
    it('Change shortDescription should be doable', () => {
        cy.get("#assetDescriptionTextField").clear().type("Endre beskrivelsen")
    });
    it('Clicking update should update the asset and bring you back to previous list of assets', () => {
        cy.get("#updateButton").click();
    });
    it('Asset description is now updated', () => {
        cy.get("#assetList")
            .find('li').first().contains("Endre beskrivelsen")
    });
    it('Clicking edit asset', () => {
        cy.get("#assetList").find("button").first().click();
    });
    it('Switch Tab to Komponenter should give a different view', () => {
        cy.get("#assetTabHeaderAdapters").click();
    });
    it('Adapter list should be 2 lines', () => {
        cy.get("#assetAdapterList")
            .find('li')
            .should(
                ($tr) => {
                    expect($tr).to.have.length(2)
                }
            )
    });
    it('Clicking removing adapter prompts warning message with confirmation', () => {
        cy.get("#assetAdapterList")
            .find('li')
            .first().find("button").click();
        cy.get("#alert-dialog-title").should("be.visible");
    });
    it('Confirming removing component', () => {
        cy.removeAdapterFromAssetApiCall();
        cy.get("#confirm").click();
    });
    it('Message shown states component removed', () => {
        cy.get("#notifySnackbar").contains("Test ble slettet fra test_no");
    });
    it('Remove icon should now change to Add icon', () => {
        cy
            .get("#assetAdapterList")
            .find("button")
            .first()
            .invoke('attr', 'aria-label')
            .should('contain', 'Add');
    });
    it('Switch Tab to Klienter should give a different view', () => {
        cy.apiIntercept();
        cy.get("#assetTabHeaderClients").click();
        cy.wait(400);
    });
    it('Adapter list should be 2 lines', () => {
        cy.get("#assetClientsList")
            .find('li')
            .should(
                ($tr) => {
                    expect($tr).to.have.length(2)
                }
            )
    });
    it('Clicking removing client prompts warning message with confirmation', () => {
        cy.get("#assetClientsList")
            .find('li')
            .first().find("button").click();
        cy.get("#alert-dialog-title").should("be.visible");
    });
    it('Confirming removing component', () => {
        cy.removeClientFromAssetApiCall();
        cy.get("#confirm").click();
    });
    it('Message shown states component removed', () => {
        cy.get("#notifySnackbar").contains("Til testing ble slettet fra test_no");
    });
    it('Client list should be 1 lines', () => {
        cy.get("#assetClientsList")
            .find('li')
            .should(
                ($tr) => {
                    expect($tr).to.have.length(1)
                }
            )
    });
    it('Clicking client icon on client moves you to client page', () => {
        cy.get("#assetClientsList")
            .find('li')
            .first().find("button").first().next().click();
        cy.url().should('include', '/clients');
    });

});
