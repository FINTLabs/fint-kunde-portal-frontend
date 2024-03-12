import React, {useEffect, useState} from "react";
import "./App.css";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Main from "./main/Main";
import {Provider} from "react-redux";
import store from "./data/redux/store/configure-store";
import {CookiesProvider} from "react-cookie";
import AppProvider from "./data/context/AppProvider";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";


const theme = createTheme({
    palette: {
        background: {
            default: '#fafafa',
        },
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
    const [basePath, setBasePath] = useState('/');
    useEffect(() => {
        axios
            .get('betaling/api/application/configuration')
            .then((value) => {
                axios.defaults.baseURL = value.data.basePath;
                setBasePath(value.data.basePath);
            })
            .catch((reason) => {
                // eslint-disable-next-line no-console
                console.log(reason);
                setBasePath('/');
            });
        // eslint-disable-next-line no-console
        console.log('Base path:', basePath);
    }, [basePath]);

    return (
        <Provider store={store}>
            <CookiesProvider>
                <AppProvider>
                    <ThemeProvider theme={theme}>
                        <BrowserRouter basename={basePath}>
                            <Main/>
                        </BrowserRouter>
                    </ThemeProvider>
                </AppProvider>
            </CookiesProvider>
        </Provider>
    );
}

App.propTypes = {};

export default App;
