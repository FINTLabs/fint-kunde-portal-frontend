import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
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
import {FeatureToggle} from "@fintlabs/fint-feature-toggle-react";
import List from "@material-ui/core/List";
import LogIcon from "@material-ui/icons/Receipt";


const MenuItems = () => {
    return (
        <List id={"menuList"}>
            <ListItem button component={Link} to="/" id={"HomeMenuButton"}>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" id={"HomeMenuButtonText"}/>
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
            <FeatureToggle feature="access-packages">
                <ListItem button component={Link} to="/access_package">
                    <ListItemIcon>
                        <KeyIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Rettighetspakker"/>
                </ListItem>
            </FeatureToggle>
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
            <FeatureToggle feature="audit-log">
                <ListItem button component={Link} to="/logs">
                    <ListItemIcon>
                        <LogIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Hendelseslogg"/>
                </ListItem>
            </FeatureToggle>
            <Divider/>
            <ListItem button component={Link} to="/support/issue">
                <ListItemIcon>
                    <ContactSupport/>
                </ListItemIcon>
                <ListItemText primary="Opprett support sak"/>
            </ListItem>
            <Divider/>
            <ListItem button component={Link}
                      href="https://idp.felleskomponent.no/nidp/app/logout">
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="Logg ut"/>
            </ListItem>
        </List>
    );
};

export default MenuItems;
