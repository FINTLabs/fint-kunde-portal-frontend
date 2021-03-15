import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppMenu from "./appmenu/AppMenu";
import MeApi from "../data/api/MeApi";
import NoGoContainer from "../features/nogo/NoGoContainer";
import Provider from "react-redux/es/components/Provider";
import store from "../data/redux/store/configure-store";
import {CookiesProvider} from "react-cookie";
import AppProvider from "../data/context/AppProvider";

class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            contactExists: false,
            contactHasOrganisations: false
        };
    }

    componentDidMount() {
        // TODO: Use redux instead
        MeApi.getMe().then((response) => {
            if (response.status === 200) {
                this.setState({
                    contactExists: true,
                    contactHasOrganisations:
                        response.data.legal.length > 0 || response.data.technical.length > 0,
                    me: response.data
                });
            } else {
                this.setState({
                    contactExists: false,
                    contactHasOrganisations: false
                });
            }
        });
    }

    render() {
        const {contactExists, contactHasOrganisations} = this.state;
        if (contactExists && contactHasOrganisations) {
            return this.renderAppMenu();
        }
        return (
            <NoGoContainer
                contactExists={contactExists}
                contactHasOrganisations={contactHasOrganisations}
            />
        );
    }

    renderAppMenu() {
        return (
            <Provider store={store}>
                <CookiesProvider>
                    <AppProvider>
                        <BrowserRouter basename="/">
                            <AppMenu me={this.state.me}/>
                        </BrowserRouter>
                    </AppProvider>
                </CookiesProvider>
            </Provider>
        );
    }
}

Main.propTypes = {};

export default Main;
