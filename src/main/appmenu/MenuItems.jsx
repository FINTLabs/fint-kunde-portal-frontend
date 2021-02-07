import React from 'react';
import {Button, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ClientIcon from "@material-ui/icons/ImportantDevices";
import ApiIcon from "@material-ui/icons/WebAsset";
import AdapterIcon from "@material-ui/icons/Link";
import ContactIcon from "@material-ui/icons/Person";
import RelationTestIcon from "@material-ui/icons/TrendingFlat";
import BasicTestIcon from "@material-ui/icons/Done";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import AssetIcon from "@material-ui/icons/Storage";
import ContactSupport from "@material-ui/icons/ContactSupport"
import KeyIcon from "@material-ui/icons/Lock"
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider/Divider";
import FeatureToogle from "../../common/feature-toogle/FeatureToogle";

const MenuItems = () => {
    return (
        <>
            <ListItem button component={Link} to="/">
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>
            <Divider/>
            <ListItem button component={Link} to="/contacts">
                <ListItemIcon>
                    <ContactIcon/>
                </ListItemIcon>
                <ListItemText primary="Kontakter"/>
            </ListItem>
            <ListItem button component={Link} to="/components">
                <ListItemIcon>
                    <ApiIcon/>
                </ListItemIcon>
                <ListItemText primary="Komponenter"/>
            </ListItem>
            <ListItem button component={Link} to="/adapters">
                <ListItemIcon>
                    <AdapterIcon/>
                </ListItemIcon>
                <ListItemText primary="Adapter"/>
            </ListItem>
            <ListItem button component={Link} to="/clients">
                <ListItemIcon>
                    <ClientIcon/>
                </ListItemIcon>
                <ListItemText primary="Klienter"/>
            </ListItem>
            <ListItem button component={Link} to="/assets">
                <ListItemIcon>
                    <AssetIcon/>
                </ListItemIcon>
                <ListItemText primary="Ressurser"/>
            </ListItem>
            <FeatureToogle feature="fint-kunde-portal.access-packages">
                <ListItem button component={Link} to="/access_package">
                    <ListItemIcon>
                        <KeyIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Rettighetspakker"/>
                </ListItem>
            </FeatureToogle>
            <Divider/>
            <ListItem button component={Link} to="/test/basic">
                <ListItemIcon>
                    <BasicTestIcon/>
                </ListItemIcon>
                <ListItemText primary="Basistest"/>
            </ListItem>
            <ListItem button component={Link} to="/test/linkwalker">
                <ListItemIcon>
                    <RelationTestIcon/>
                </ListItemIcon>
                <ListItemText primary="Relasjonstest"/>
            </ListItem>
            <Divider/>
            <ListItem button component={Link} to="/support/issue">
                <ListItemIcon>
                    <ContactSupport/>
                </ListItemIcon>
                <ListItemText primary="Opprett support sak"/>
            </ListItem>
            <Divider/>
            <ListItem button component={Button}
                      href="https://idp.felleskomponent.no/nidp/app/logout">
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Logg ut"/>
            </ListItem>
        </>
    );
};

export default MenuItems;
