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
            //cy.get("p").first().contains("En basistest undersøker om alle delene i FINT komponenten");
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




    /*
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
    });*/
});
