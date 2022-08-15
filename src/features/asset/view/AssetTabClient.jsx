import React from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@mui/material";
import ComponentIcon from "@mui/icons-material/WebAsset";
import ClientIcon from "@mui/icons-material/ImportantDevices";
import { green } from "@mui/material/colors/index";
import LoadingProgress from "../../../common/status/LoadingProgress";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import InformationMessageBox from "../../../common/message-box/InformationMessageBox";
import { withContext } from "../../../data/context/withContext";
import AssetApi from "../../../data/api/AssetApi";
import { Link } from "react-router-dom";
import RemoveButton from "../../../common/button/RemoveButton";
import AddButton from "../../../common/button/AddButton";

const PREFIX = 'AssetTabClient';

const classes = {
  root: `${PREFIX}-root`,
  componentList: `${PREFIX}-componentList`,
  avtarstyle: `${PREFIX}-avtarstyle`,
  title: `${PREFIX}-title`,
  listItem: `${PREFIX}-listItem`,
  itemAvatar: `${PREFIX}-itemAvatar`
};

const StyledDiv = styled('div')((
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

  [`& .${classes.avtarstyle}`]: {
    margin: 1,
    color: "#fff",
    backgroundColor: green[500]
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
    backgroundColor: theme.palette.secondary.main
  }
}));

class AssetTabClient extends React.Component {
  askToUnLinkClient = client => {
    this.setState({
      thisClient: client,
      askUnLink: true,
      message:
        "Er du sikker på at du vil fjerne " +
        client.shortDescription +
        " fra:  " +
        this.props.asset.name +
        "?"
    });
  };

  askToLinkClient = client => {
    this.setState({
      thisClient: client,
      askLink: true,
      message: "Vil du legge  " + client.shortDescription + " til asset?"
    });
  };

  unLinkClient = () => {
    AssetApi.deleteClientFromAsset(
      this.state.thisClient,
      this.props.asset,
      this.props.context.currentOrganisation
    )
      .then(() => {
        this.props.notify(
          `${this.state.thisClient.shortDescription} ble slettet fra ${
            this.props.asset.name
          }`
        );
        this.props.fetchAssets(this.props.context.currentOrganisation.name);
        this.props.fetchClients(this.props.context.currentOrganisation.name);
      })
      .catch(error => {});
  };

  linkClient = () => {
    AssetApi.addClientToAsset(
      this.state.thisClient,
      this.props.asset,
      this.props.context.currentOrganisation
    )
      .then(() => {
        this.props.notify(
          `${this.state.thisClient.shortDescription} ble lagt til ${
            this.props.asset.name
          }`
        );
        this.props.fetchAssets(this.props.context.currentOrganisation.name);
        this.props.fetchClients(this.props.context.currentOrganisation.name);
      })
      .catch(error => {});
  };

  onCloseLink = confirmed => {
    this.setState({
      askLink: false
    });

    if (confirmed) {
      this.linkClient(this.state.thisClient);
    }
  };

  onCloseUnLink = confirmed => {
    this.setState({
      askUnLink: false
    });

    if (confirmed) {
      this.unLinkClient();
    }
  };

  isLinkedToAsset = client => {
    return client.asset === this.props.asset.dn;
  };

  hasAsset = client => {
    return client.assetId !== null;
  };

  constructor(props) {
    super(props);
    this.state = {
      askLink: false,
      askUnLink: false,
      message: ""
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.clients !== prevState.clients) {
      return {
        clients: nextProps.clients
      };
    }
    if (nextProps.asset !== prevState.asset) {
      return {
        asset: nextProps.asset
      };
    }

    return null;
  }

  render() {
    if (!this.props.clients) {
      return <LoadingProgress />;
    } else {
      return this.renderClients();
    }
  }

  renderClients() {
    const organisationClients = this.props.clients;
    if (organisationClients.length > 0) {
      return (
        <StyledDiv>
          <WarningMessageBox
            show={this.state.askUnLink}
            message={this.state.message}
            onClose={this.onCloseUnLink}
          />
          <InformationMessageBox
            show={this.state.askLink}
            message={this.state.message}
            onClose={this.onCloseLink}
          />
          <List id={"assetClientsList"}>
            {organisationClients.map(client => (
              <ListItem className={classes.listItem} key={client.dn}>
                <ListItemAvatar>
                  <Avatar className={classes.itemAvatar}>
                    <ComponentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={client.shortDescription}
                  secondary={client.name}
                />
                <ListItemSecondaryAction>
                  {this.isLinkedToAsset(client) ? (
                    <React.Fragment>
                      <RemoveButton
                        onClick={() => this.askToUnLinkClient(client)}
                        title="Fjerne klienten fra ressursen"
                      />
                      <IconButton
                        aria-label="Remove"
                        component={Link}
                        to="/clients"
                      >
                        <ClientIcon />
                      </IconButton>
                    </React.Fragment>
                  ) : (
                    <AddButton
                      onClick={() => this.askToLinkClient(client)}
                      title="Legge klienten til ressursen"
                    />
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </StyledDiv>
      );
    } else {
      return (
        <Typography variant="subheading">
          Det er ikke lagt til noen klienter for denne organisasjonen.
        </Typography>
      );
    }
  }
}

export default (withContext(AssetTabClient));
