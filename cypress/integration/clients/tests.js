describe('Testing clients page', () => {
    it('Clicking on menu item for client brings you to correct page', () => {
        cy.apiIntercept();
        cy.goToHome();
        cy.get("#menuBurger").click();
        cy.get("#menuList").children().contains("Klienter").click();
        cy.url().should('include', '/clients');
    });
    it('Information about client should be available', () => {
            cy.get("p").first().should('be.visible');
            cy.get("p").first().contains("En klient er påloggingsinformasjon");
        }
    );
    it('Clients should show as expected', () => {
            cy.get("#clientList").should('be.visible');
        }
    );
    it('Client list should be 2 lines', () => {
            cy.get("#clientList")
                .find('li')
                .should(
                    ($tr) => {
                        expect($tr).to.have.length(2)
                    }
                )
        }
    );
    it('Clicking edit client button opens dialog', () => {
        cy.get("#clientList").find("button").first().click();
        cy.get('#form-dialog-title').should('be.visible');
    });
    it('Change shortDescription should be doable', () => {
        cy.apiIntercept();
        cy.get("#shortDescriptionTextField").clear().type("Endre beskrivelsen")
    });
    it('Change the note should be doable', () => {
        cy.apiIntercept();
        cy.get("#noteTextField").clear().type("Endre notatet")
    });
    it('Clicking update should update the client and bring you back to previous list of clients', () => {
        cy.get("#updateButton").click();
    });
    it('Client description is now updated', () => {
        cy.get("#clientList")
            .find('li').first().contains("Endre beskrivelsen")
    });
    it('Clicking edit client', () => {
        cy.get("#clientList").find("button").first().click();
    });
    it('Switch Tab to Komponenter should give a different view', () => {
        cy.get("#clientTabHeaderComponents").click();
    });
    it('Client list should be 5 lines', () => {
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
        cy.get("#notifySnackbar").contains("test@client.fintlabs.no ble lagt til Test Kodeverk");
    });
    it('Switch Tab to Autentisering should give a different view', () => {
        cy.apiIntercept();
        cy.get("#clientTabHeaderAuthentication").click();
    });
    it('Check that username is present', () => {
        cy.get("#name").invoke('val').should("contain", "test@client.fintlabs.no");
    });
    it('Check that password is not present', () => {
        cy.get("#adornment-password").invoke('val').should("contain", "**********");
    });
    it('Check that client ID is present', () => {
        cy.get("#id").invoke('val').should("contain", "abc123456");
    });
    it('Check that client secret is not present', () => {
        cy.get("#client-secret").invoke('val').then(value => expect(value).to.eql(" "));
    });
    it('Check that resource is present', () => {
        cy.get("#asset-id").invoke('val').should("contain", "test.no");
        cy.wait(500);
    });
    it('Check that copying name value gets copied and is corrrect', () => {
        cy.apiIntercept();
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns(win.prompt).as('copyToClipboardPrompt');
            cy.get("#nameFormControl").find("button").first().click();
        });


        cy.get('@copyToClipboardPrompt').should('be.called');
        cy.get('@copyToClipboardPrompt').should(prompt => {
            expect(prompt.args[0][1]).to.equal("test@client.fintlabs.no");
        });
    });
    it('Check that copying all gets copied and is corrrect', () => {
        cy.apiIntercept();
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns(win.prompt).as('copyToClipboardPrompt');
            cy.get("#copyAllAuthInformation").click();
        });


        cy.get('@copyToClipboardPrompt').should('be.called');
        cy.get('@copyToClipboardPrompt').should(prompt => {
            expect(prompt.args[0][1]).to.equal("{\n" +
                "  \"username\": \"test@client.fintlabs.no\",\n" +
                "  \"password\": \"**********\",\n" +
                "  \"clientId\": \"abc123456\",\n" +
                "  \"openIdSecret\": \" \",\n" +
                "  \"scope\": \"fint-client\",\n" +
                "  \"idpUri\": \"https://idp.felleskomponent.no/nidp/oauth/nam/token\",\n" +
                "  \"assetId\": \"test.no\"\n" +
                "}");
        });
    });
    it('Closing the the pop up by clicking the "Lukk"-button brings you back', () => {
        cy.get("#closeButton").click();
        cy.get("#closeButton").should("not.exist")
    });
    it('Click add FAB gives opens a pop up', () => {
        cy.apiIntercept();
        cy.get("#clientAddFAB").click();
    });
    it('Adding user name', () => {
        cy.get("#userNameInput").type("testclient");
    });
    it('Adding client short description', () => {
        cy.get("#newClientShortDesc").type("Klient short description");
    });
    it('Adding client note', () => {
        cy.get("#newClientNote").type("Klient notat");
    });
    it('Adding client', () => {
        cy.apiIntercept();
        cy.get("#addNewClientButton").click();
    });
    it('Confirm ok by snackbar', () => {
        cy.get("#notifySnackbar").contains('Klienten ble opprettet');
    });
});