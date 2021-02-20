import React from "react";
import "./App.css";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import Main from "./main/Main";


const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#f05545",
            main: "#b71c1c",
            dark: "#7f0000",
            contrastText: "#fff"
        },
        secondary: {
            light: "#98ee99",
            main: "#66bb6a",
            dark: "#338a3e",
            contrastText: "#000"
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
        <MuiThemeProvider theme={theme}>
            <Main/>
        </MuiThemeProvider>
    );
}

App.propTypes = {};

export default App;
