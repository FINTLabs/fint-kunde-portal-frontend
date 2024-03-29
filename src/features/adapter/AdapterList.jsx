import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar, Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText, Tab, Tabs,
  Typography
} from "@mui/material";
import { Delete, Edit, InsertLink } from "@mui/icons-material";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import AdapterView from "./view/AdapterView";
import { withContext } from "../../data/context/withContext";
import PropTypes from "prop-types";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import WarningMessageBox from "../../common/message-box/WarningMessageBox";
import Sort from "../../common/utils/Sort";

const PREFIX = 'AdapterList';

const classes = {
  root: `${PREFIX}-root`,
  componentList: `${PREFIX}-componentList`,
  title: `${PREFIX}-title`,
  listItem: `${PREFIX}-listItem`,
  itemAvatar: `${PREFIX}-itemAvatar`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    display: "flex",
    justifyContent: "center"
  },

  [`& .${classes.componentList}`]: {
    width: "75%"
  },

  [`& .${classes.title}`]: {
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(1)
  },

  [`& .${classes.listItem}`]: {
    borderBottom: "1px dashed lightgray"
  },

  [`& .${classes.itemAvatar}`]: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.light
  }
}));

class AdapterList extends Component {
  handleChange = (event, newValue) => {
    this.setState({
      isManaged:newValue,
    })
  };

  editAdapter = adapter => {
    this.setState({
      open: true,
      adapterToEdit: adapter
    });
  };
  onCloseEdit = () => {
    this.setState({ open: false });
  };
  updateAdapter = adapter => {
    const { currentOrganisation } = this.props.context;
    this.props.updateAdapter(adapter, currentOrganisation.name);
  };
  deleteAdapter = adapter => {
    const { currentOrganisation } = this.props.context;
    this.props.deleteAdapter(adapter, currentOrganisation.name);
    this.setState({
      notify: true,
      adapterDeletedName: adapter.name
    });
  };

  askToDelete = adapter => {
    this.setState({
      askToDelete: true,
      message: `Er du sikker på at du vil slette '${
        adapter.name
      }'? Endringen kan ikke tilbakestilles!`,
      adapterToDelete: adapter
    });
  };

  onCloseDelete = confirmed => {
    this.setState({
      askToDelete: false
    });

    if (confirmed) {
      this.deleteAdapter(this.state.adapterToDelete);
    }
  };

  onCloseNotification = () => {
    this.setState({
      notify: false
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      adapters: this.props.adapters,
      adapterToEdit: null,
      adapterToDelete: null,
      open: false,
      notify: false,
      adapterDeletedName: null,
      askToDelete: false,
      message: "",
      isManaged: false,
    };
  }

  render() {
    const adapters = this.props.adapters.sort(Sort.alphabetically);

    return (
      <Root>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={`Adapter ${this.state.adapterDeletedName} ble slettet!`}
          onClose={this.onCloseNotification}
        />
        <WarningMessageBox
          show={this.state.askToDelete}
          message={this.state.message}
          onClose={this.onCloseDelete}
        />
        <div className={classes.root}>
          <div className={classes.componentList}>
            <FeatureHelperText>
              <p>
                Ett adapter er påloggingsinformasjon som brukes av
                fagsystem-adapterne for å få tilgang til en komponent. Dette kan
                f.eks. Visma Enterprise eller Unit4 (Evry).
              </p>
              <p>
                Adaptere må registreres før fagsystem-adapteret kan tas i bruk.
                Et adapter må få opprettet påloggingsinformasjon og bli gitt
                tilgang til de komponentene det skal levere data for.
                Påloggingsinformasjonen og informasjon om endepunkter må oppgis
                til den som skal installere og konfigurere adapteret.
              </p>
              <p>
                Automatisk opprettede klienter er generert ved oppsett av nye tjenester,
                eliminerer behovet for manuell håndtering og utveksling av autentiseringsinformasjon.
                De blir etablert for å møte et tilgangsbehov i et undersystem i FINT.
              </p>
            </FeatureHelperText>
            <Typography variant="h5" className={classes.title}>
              Adapter
            </Typography>
            <Divider />

            <Box sx={{borderBottom: 1, borderBottomColor: "divider"}}>
              <Tabs
                  value={this.state.isManaged}
                  onChange={this.handleChange}
                  aria-label="hvordan-client-er-opprettet"
              >
                <Tab value={false} label="Manuelt opprettet" />
                <Tab value={true} label="Automatisk opprettet" />
              </Tabs>
            </Box>

            <List id={"adapterList"}>
              {adapters
                  .filter( adapter => adapter.managed === this.state.isManaged)
                  .map(adapter => (
                <ListItem className={classes.listItem} key={adapter.dn}>
                  <ListItemAvatar>
                    <Avatar className={classes.itemAvatar}>
                      <InsertLink />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={adapter.shortDescription}
                    secondary={adapter.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Edit"
                      onClick={() => this.editAdapter(adapter)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.askToDelete(adapter)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <AdapterView
          open={this.state.open}
          adapter={this.state.adapterToEdit}
          onClose={this.onCloseEdit}
          updateAdapter={this.updateAdapter}
        />
      </Root>
    );
  }
}

AdapterList.propTypes = {
  adapters: PropTypes.array.isRequired
};

export default (withContext(AdapterList));
