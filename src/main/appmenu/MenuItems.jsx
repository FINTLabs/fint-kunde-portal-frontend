import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClientIcon from "@mui/icons-material/ImportantDevices";
import ApiIcon from "@mui/icons-material/WebAsset";
import AdapterIcon from "@mui/icons-material/Link";
import ContactIcon from "@mui/icons-material/Person";
import RelationTestIcon from "@mui/icons-material/TrendingFlat";
import BasicTestIcon from "@mui/icons-material/Done";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import AssetIcon from "@mui/icons-material/Storage";
import ContactSupport from "@mui/icons-material/ContactSupport"
import KeyIcon from "@mui/icons-material/Lock"
import {Link} from "react-router-dom";
import List from "@mui/material/List";
import LogIcon from "@mui/icons-material/Receipt";
import RoleAuthorizationMenu from "../../common/authorization/RoleAuthorizationMenu";
import FeatureToggle from "../../common/feature-toggle/FeatureToggle";

const MenuItems = () => {
    return (
        <List id="menuList">
            <RoleAuthorizationMenu role="ROLE_DASHBOARD">
                <ListItem button component={Link} to="/dashboard" id="HomeMenuButton">
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" id="HomeMenuButtonText"/>
                </ListItem>
            </RoleAuthorizationMenu>
            <RoleAuthorizationMenu role="ROLE_ORGANISATION">
                <ListItem button component={Link} to="/contacts">
                    <ListItemIcon>
                        <ContactIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Kontakter"/>
                </ListItem>
            </RoleAuthorizationMenu>
            <RoleAuthorizationMenu role="ROLE_COMPONENT">
                <ListItem button component={Link} to="/components">
                    <ListItemIcon>
                        <ApiIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Komponenter"/>
                </ListItem>
            </RoleAuthorizationMenu>
            <RoleAuthorizationMenu role="ROLE_ADAPTER">
                <ListItem button component={Link} to="/adapters">
                    <ListItemIcon>
                        <AdapterIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Adapter"/>
                </ListItem>
            </RoleAuthorizationMenu>
            <RoleAuthorizationMenu role="ROLE_CLIENT">
                <ListItem button component={Link} to="/clients">
                    <ListItemIcon>
                        <ClientIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Klienter"/>
                </ListItem>
            </RoleAuthorizationMenu>
            <RoleAuthorizationMenu role="ROLE_ASSET">
                <ListItem button component={Link} to="/assets">
                    <ListItemIcon>
                        <AssetIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Ressurser"/>
                </ListItem>
            </RoleAuthorizationMenu>
            <FeatureToggle feature="access-packages">
                <RoleAuthorizationMenu role="ROLE_ACCESS_PACKAGE">
                    <ListItem button component={Link} to="/access_package">
                        <ListItemIcon>
                            <KeyIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Tilgangspakker"/>
                    </ListItem>
                </RoleAuthorizationMenu>
            </FeatureToggle>
            <RoleAuthorizationMenu role="ROLE_TEST">
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
            </RoleAuthorizationMenu>
            <FeatureToggle feature="audit-log">
                <RoleAuthorizationMenu role="ROLE_LOG">
                    <ListItem button component={Link} to="/logs">
                        <ListItemIcon>
                            <LogIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Hendelseslogg"/>
                    </ListItem>
                </RoleAuthorizationMenu>
            </FeatureToggle>
            <RoleAuthorizationMenu role="ROLE_SUPPORT">
                <ListItem button component={Link} to="/support/issue">
                    <ListItemIcon>
                        <ContactSupport/>
                    </ListItemIcon>
                    <ListItemText primary="Opprett support sak"/>
                </ListItem>
            </RoleAuthorizationMenu>
            <ListItem button component="a"
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
