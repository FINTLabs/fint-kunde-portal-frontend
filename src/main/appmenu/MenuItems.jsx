import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
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
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider/Divider";

const menuLink = {
  textDecoration: "none",
  color: "inherit"
};

export const MENU_ITEMS = (
  <div>
    <Link to="/" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Divider />
    <Link to="/contacts" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <ContactIcon />
        </ListItemIcon>
        <ListItemText primary="Kontakter" />
      </ListItem>
    </Link>
    <Link to="/components" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <ApiIcon />
        </ListItemIcon>
        <ListItemText primary="Komponenter" />
      </ListItem>
    </Link>
    <Link to="/adapters" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <AdapterIcon />
        </ListItemIcon>
        <ListItemText primary="Adapter" />
      </ListItem>
    </Link>
    <Link to="/clients" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <ClientIcon />
        </ListItemIcon>
        <ListItemText primary="Klienter" />
      </ListItem>
    </Link>
    <Link to="/assets" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <AssetIcon />
        </ListItemIcon>
        <ListItemText primary="Ressurser" />
      </ListItem>
    </Link>
    <Divider />
    <Link to="/test/basic" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <BasicTestIcon />
        </ListItemIcon>
        <ListItemText primary="Basistest" />
      </ListItem>
    </Link>
    <Link to="/test/linkwalker" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <RelationTestIcon />
        </ListItemIcon>
        <ListItemText primary="Relasjonstest" />
      </ListItem>
        <Divider/>
    </Link>
      <Link to="/support/issue" style={menuLink}>
          <ListItem button>
              <ListItemIcon>
                  <ContactSupport />
              </ListItemIcon>
              <ListItemText primary="Opprett support sak" />
          </ListItem>
      </Link>
    <Divider />
    <a href="https://idp.felleskomponent.no/nidp/app/logout" style={menuLink}>
      <ListItem button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logg ut" />
      </ListItem>
    </a>
  </div>
);

/*
<Link to="/logs" style={menuLink}>
    <ListItem button>
      <ListItemIcon>
        <LogIcon/>
      </ListItemIcon>
      <ListItemText primary="Logger"/>
    </ListItem>
  </Link>
  <Link to="/support" style={menuLink}>
    <ListItem button>
      <ListItemIcon>
        <SupportIcon/>
      </ListItemIcon>
      <ListItemText primary="Support"/>
    </ListItem>
  </Link>
  <Link to="/documentation" style={menuLink}>
    <ListItem button>
      <ListItemIcon>
        <DocumentationIcon/>
      </ListItemIcon>
      <ListItemText primary="Dokumentasjon"/>
    </ListItem>
  </Link>
        <Link to="/access_package" style={menuLink}>
          <ListItem button>
              <ListItemIcon>
                  <KeyIcon />
              </ListItemIcon>
              <ListItemText primary="Rettighetspakker" />
          </ListItem>
      </Link>
 */
