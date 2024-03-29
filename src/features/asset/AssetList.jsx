import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography
} from "@mui/material";
import { Delete, Edit, InsertLink } from "@mui/icons-material";
import AssetView from "./view/AssetView";
import PropTypes from "prop-types";
import { withContext } from "../../data/context/withContext";
import WarningMessageBox from "../../common/message-box/WarningMessageBox";
import FeatureHelperText from "../../common/help/FeatureHelperText";

const PREFIX = 'AssetList';

const classes = {
  root: `${PREFIX}-root`,
  componentList: `${PREFIX}-componentList`,
  title: `${PREFIX}-title`,
  listItem: `${PREFIX}-listItem`,
  primaryAsset: `${PREFIX}-primaryAsset`,
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

  [`& .${classes.primaryAsset}`]: {
    borderBottom: "1px dashed lightgray",
    backgroundColor: theme.palette.grey[200]
  },

  [`& .${classes.itemAvatar}`]: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.light
  }
}));

class AssetList extends Component {
  editAsset = asset => {
    this.setState({
      open: true,
      assetToEdit: asset
    });
  };
  onCloseEdit = () => {
    this.setState({ open: false });
  };
  updateAsset = asset => {
    const { currentOrganisation } = this.props.context;
    this.props.updateAsset(asset, currentOrganisation.name);
  };

  askToDeleteAsset = asset => {
    this.setState({
      assetToDelete: asset,
      askToDeleteAsset: true,
      message:
        "Er du sikker på at du vil slette ressursen '" +
        asset.description +
        "'?"
    });
  };

  onCloseDeleteAsset = confirmed => {
    this.setState({
      askToDeleteAsset: false
    });

    if (confirmed) {
      this.deleteAsset(this.state.assetToDelete);
    }
  };

  deleteAsset = asset => {
    const { currentOrganisation } = this.props.context;
    this.props.deleteAsset(asset, currentOrganisation.name);
    this.props.notify(`Ressursen ${asset.name} ble slettet!`);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.assets !== prevState.assets) {
      return {
        assets: nextProps.assets
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      assets: this.props.assets,
      assetToEdit: null,
      open: false,
      askToDeleteAsset: false,
      message: ""
    };
  }

  render() {
    return (
      <Root>
        <WarningMessageBox
          show={this.state.askToDeleteAsset}
          message={this.state.message}
          onClose={this.onCloseDeleteAsset}
        />
        <div className={classes.root}>
          <div className={classes.componentList}>
            <FeatureHelperText>
              <p>
                En ressurs er identifikatoren som styrer en forespørsel mot en
                komponent til riktig organisasjon. Alle adapter og klienter må
                være knyttet til en ressurs.
              </p>
              <p>
                Når man lager et nytt adapter eller klient vil disse automatisk
                bli tilknyttet primærressursen.
              </p>
            </FeatureHelperText>
            <Typography variant="h5" className={classes.title}>
              Ressurser
            </Typography>
            <Divider />
            <List id={"assetList"}>
              {this.props.assets.map(asset => (
                <ListItem
                  className={
                    asset.primaryAsset === true
                      ? classes.primaryAsset
                      : classes.listItem
                  }
                  key={asset.name}
                >
                  <ListItemAvatar>
                    <Avatar className={classes.itemAvatar}>
                      <InsertLink />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={asset.description}
                    secondary={asset.assetId}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Edit"
                      onClick={() => this.editAsset(asset)}
                    >
                      <Edit />
                    </IconButton>
                    {asset.primaryAsset !== true && (
                      <IconButton
                        aria-label="Delete"
                        onClick={() => this.askToDeleteAsset(asset)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <AssetView
          open={this.state.open}
          asset={this.state.assetToEdit}
          fetchAssets={this.props.fetchAssets}
          onClose={this.onCloseEdit}
          updateAsset={this.updateAsset}
        />
      </Root>
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array.isRequired
};

export default (withContext(AssetList));
