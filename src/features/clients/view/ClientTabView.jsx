import React, {useState} from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles, Tab, Tabs, useTheme} from "@material-ui/core";
import TabContainer from "../../../common/tab/TabContainer";
import PropTypes from "prop-types";
import ClientTabComponent from "./ClientTabComponent";
import ClientTabGeneral from "./ClientTabGeneral";
import ClientTabAuthenticationInformation from "./ClientTabAuthenticationInformation";
import ClientTabAccess from "./ClientTabAccess";
import {createStyles} from "@material-ui/core/styles";
import useFeatureEnabled from "../../../common/feature-toggle/useFeatureEnabled";
import FeatureToggle from "../../../common/feature-toggle/FeatureToggle";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: "100%"
        }
    }));

const ClientTabView = ({showUpdateButton, client, updateClientState, notify}) => {
    const [value, setValue] = useState(0);
    const classes = useStyles();
    const theme = useTheme();
    const featureEnabled = useFeatureEnabled("access-packages");

    const handleChange = (event, value) => {
        setValue(value);

        if (value === 0) {
            showUpdateButton(true);
        } else {
            showUpdateButton(false);
        }
    };
    const handleChangeIndex = (index) => {
        setValue(index);
    };


    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label="Generelt"/>
                    <Tab label="Komponenter" id={"clientTabHeaderComponents"}/>
                    <Tab label="Autentisering" id={"clientTabHeaderAuthentication"}/>
                    {featureEnabled && <Tab label="Tilgangspakke"/>}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabContainer dir={theme.direction}>
                    <ClientTabGeneral
                        client={client}
                        updateClientState={updateClientState}
                    />
                </TabContainer>

                <TabContainer dir={theme.direction}>
                    <ClientTabComponent
                        client={client}
                        notify={notify}
                    />
                </TabContainer>
                <TabContainer dir={theme.direction}>
                    <ClientTabAuthenticationInformation
                        client={client}
                        notify={notify}
                    />
                </TabContainer>
                <FeatureToggle feature="access-packages">
                    <TabContainer dir={theme.direction}>
                        <ClientTabAccess
                            client={client}
                        />
                    </TabContainer>
                </FeatureToggle>

            </SwipeableViews>
        </div>
    );
}

ClientTabView.propTypes = {
    client: PropTypes.object,
    notify: PropTypes.func.isRequired,
    updateClientState: PropTypes.func.isRequired,
    showUpdateButton: PropTypes.func.isRequired
};

export default ClientTabView;
