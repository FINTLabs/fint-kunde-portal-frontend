import React from "react";
import "./App.css";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Main from "./main/Main";
import {Provider} from "react-redux";
import store from "./data/redux/store/configure-store";
import {CookiesProvider} from "react-cookie";
import AppProvider from "./data/context/AppProvider";


const theme = createMuiTheme({
    palette: {
        secondary: {
            light: '#7fb434',
            main: '#5FA202',
            dark: '#427101',
        },
        primary: {
            light: '#4b727a',
            main: '#1F4F59',
            dark: '#15373e',
        },

        typography: {
            fontFamily: [
                "Nunito Sans", 'sans-serif'
            ].join(','),
        },
    }
});

function App() {
    return (
        <Provider store={store}>
            <CookiesProvider>
                <AppProvider>
                    <MuiThemeProvider theme={theme}>
                        <Main/>
                    </MuiThemeProvider>
                </AppProvider>
            </CookiesProvider>
        </Provider>
    );
}

App.propTypes = {};

export default App;
