describe('Testing adapters page', () => {
    it('Clicking on menu item for adapter brings you to correct page', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.get("#menuBurger").click();
        cy.get("#menuList").children().contains("Adapter").click();
        cy.url().should('include', '/adapters');
    });
    it('Information about adapter should be available', () => {
            cy.get("p").first().should('be.visible');
            cy.get("p").first().contains("Ett adapter er påloggingsinformasjon");
        }
    );
    it('Adapter should show as expected', () => {
            cy.get("#adapterList").should('be.visible');
        }
    );
    it('Adapter list should be 2 lines', () => {
            cy.get("#adapterList")
                .find('li')
                .should(
                    ($tr) => {
                        expect($tr).to.have.length(2)
                    }
                )
        }
    );
    it('Clicking edit adapter button opens dialog', () => {
        cy.get("#adapterList").find("button").first().click();
        cy.get('#form-dialog-title').should('be.visible');
    });
    it('Change shortDescription should be doable', () => {
        cy.get("#shortDescriptionTextField").clear().type("Endre beskrivelsen")
    });
    it('Change the note should be doable', () => {
        cy.get("#noteTextField").clear().type("Endre notatet")
    });
    it('Clicking update should update the adapter and bring you back to previous list of adapters', () => {
        cy.get("#updateButton").click();
    });
    it('Adapter description is now updated', () => {
        cy.get("#adapterList")
            .find('li').first().contains("Endre beskrivelsen")
    });
    it('Clicking edit adapter', () => {
        cy.get("#adapterList").find("button").first().click();
    });
    it('Switch Tab to Komponenter should give a different view', () => {
        cy.get("#adapterTabHeaderComponents").click();
    });
    it('Components list should be 5 lines', () => {
        cy.get("#componentList")
            .find('li')
            .should(
                ($tr) => {
                    expect($tr).to.have.length(5)
                }
            )
    });
    it('Clicking removing component prompts warning message with confirmation', () => {
        cy.get("#componentList")
            .find('li')
            .first().find("button").click();
        cy.get("#alert-dialog-title").should("be.visible");
    });
    it('Confirming removing component', () => {
        cy.removeComponentApiCall();
        cy.get("#confirm").click();
    });

    it('Message shown states component removed', () => {
        cy.get("#notifySnackbar").contains("test@adapter.fintlabs.no ble lagt til Test Kodeverk");
    });
    it('Switch Tab to Autentisering should give a different view', () => {
        cy.apiIntercept();
        cy.get("#adapterTabHeaderAuthenticate").click();
    });
    it('Switch Tab to Autentisering should give a different view', () => {
        cy.apiIntercept();
        cy.get("#adapterTabHeaderAuthenticate").click();
    });
    it('Check that username is present', () => {
        cy.get("#name").invoke('val').should("contain", "test@adapter.fintlabs.no");
    });
    it('Check that password is not present', () => {
        cy.get("#adornment-password").invoke('val').should("contain", "**********");
    });
    it('Check that client ID is present', () => {
        cy.get("#id").invoke('val').should("contain", "abc123");
    });
    it('Check that client secret is not present', () => {
        cy.get("#client-secret").invoke('val').then(value => expect(value).to.eql(" "));
    });
    it('Check that resource is present', () => {
        cy.get("#asset-id").invoke('val').should("contain", "test.no");
    });
    it('Check that copying name value gets copied and is corrrect', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns(win.prompt).as('copyToClipboardPrompt');
            cy.get("#nameFormControl").find("button").first().click();
        });


        cy.get('@copyToClipboardPrompt').should('be.called');
        cy.get('@copyToClipboardPrompt').should(prompt => {
            expect(prompt.args[0][1]).to.equal("test@adapter.fintlabs.no");
        });
    });
    it('Check that copying all gets copied and is corrrect', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns(win.prompt).as('copyToClipboardPrompt');
            cy.get("#copyAllAuthInformation").click();
        });


        cy.get('@copyToClipboardPrompt').should('be.called');
        cy.get('@copyToClipboardPrompt').should(prompt => {
            expect(prompt.args[0][1]).to.equal("{\n" +
                "  \"username\": \"test@adapter.fintlabs.no\",\n" +
                "  \"password\": \"**********\",\n" +
                "  \"clientId\": \"abc123\",\n" +
                "  \"openIdSecret\": \" \",\n" +
                "  \"scope\": \"fint-client\",\n" +
                "  \"idpUri\": \"https://idp.felleskomponent.no/nidp/oauth/nam/token\",\n" +
                "  \"assetIds\": [\n" +
                "    \"test.no\"\n" +
                "  ]\n" +
                "}");
        });
    });
    it('Closing the the pop up by clicking the "Lukk"-button brings you back', () => {
        cy.get("#closeButton").click();
        cy.get("#closeButton").should("not.exist")
    });
});