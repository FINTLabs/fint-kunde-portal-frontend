import React from "react";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingProgress from "../../common/status/LoadingProgress";
import {
  createAsset,
  deleteAsset,
  fetchAssets,
  updateAsset
} from "../../data/redux/dispatchers/asset";
import AssetList from "./AssetList";
import AssetAdd from "./AssetAdd";
import { withContext } from "../../data/context/withContext";
import OrganisationApi from "../../data/api/OrganisationApi";
import AutoHideNotification from "../../common/notification/AutoHideNotification";

const PREFIX = 'AssetContainer';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {}
}));

class AssetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetAdded: false,
      notify: false,
      notifyMessage: ""
    };
  }

  componentDidMount() {
    this.props.fetchAssets(this.props.context.currentOrganisation.name);
    this.getPrimaryAssetId();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.context !== this.props.context) {
      this.props.fetchAssets(this.props.context.currentOrganisation.name);
      this.getPrimaryAssetId();
    }
  }

  getPrimaryAssetId = () => {
    OrganisationApi.getPrimaryAsset(this.props.context.currentOrganisation)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          //this.props.notify
        }
      })
      .then(asset => {
        this.setState({
          primaryAssetId: asset.assetId
        });
      });
  };

  notify = message => {
    this.setState({
      notify: true,
      notifyMessage: message
    });
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
      notifyMessage: ""
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.assets !== prevState.assets) {
      return {
        assets: nextProps.assets
      };
    }
    return null;
  }

  render() {
    if (
      this.props.assets === undefined ||
      this.props.context.currentOrganisation === undefined
    ) {
      return <LoadingProgress />;
    } else {
      return this.renderAssets();
    }
  }

  renderAssets() {
    return (
      <Root className={classes.root}>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}
        />
        <AssetList
          assets={this.props.assets}
          updateAsset={this.props.updateAsset}
          deleteAsset={this.props.deleteAsset}
          fetchAssets={this.props.fetchAssets}
          notify={this.notify}
        />
        <AssetAdd
          organisation={this.props.context.currentOrganisation}
          createAsset={this.props.createAsset}
          fetchAssets={this.props.fetchAssets}
          primaryAssetId={this.state.primaryAssetId}
          notify={this.notify}
        />
      </Root>
    );
  }
}

AssetContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    assets: state.asset.assets,
    components: state.component.components
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAssets: fetchAssets,
      updateAsset: updateAsset,
      deleteAsset: deleteAsset,
      createAsset: createAsset
    },
    dispatch
  );
}

export default (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withContext(AssetContainer))
);
