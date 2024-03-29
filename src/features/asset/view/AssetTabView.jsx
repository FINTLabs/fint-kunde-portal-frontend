import React from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import { Tab, Tabs } from "@mui/material";
import TabContainer from "../../../common/tab/TabContainer";
import PropTypes from "prop-types";
import AssetTabAdapter from "./AssetTabAdapter";
import AssetTabClient from "./AssetTabClient";
import AssetTabGeneral from "./AssetTabGeneral";
import {styled} from "@mui/material/styles";

const PREFIX = 'AssetTabView';

const classes = {
  primaryAsset: `${PREFIX}-styledDiv`
};

const StyledDiv = styled('div')((
    {
      theme
    }
) => ({
  [`& .${classes.styledDiv}`]: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));

class AssetTabView extends React.Component {
  handleChange = (event, value) => {
    this.setState({ value });
    if (value === 0) {
      this.props.showUpdateButton(true);
    } else {
      this.props.showUpdateButton(false);
    }
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.asset !== prevState.asset) {
      return {
        asset: nextProps.asset
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render() {
    // const { classes, theme } = this.props;

    return (
      <StyledDiv className={classes.styledDiv}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Generelt" />
            <Tab label="Adapters" id={"assetTabHeaderAdapters"}/>
            <Tab label="Klienter" id={"assetTabHeaderClients"}/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            axis={"x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer>
            <AssetTabGeneral
              asset={this.props.asset}
              updateAssetState={this.props.updateAssetState}
            />
          </TabContainer>

          <TabContainer>
            <AssetTabAdapter
              asset={this.props.asset}
              notify={this.props.notify}
              fetchAssets={this.props.fetchAssets}
              fetchAdapters={this.props.fetchAdapters}
              adapters={this.props.adapters}

            />
          </TabContainer>

          <TabContainer>
            <AssetTabClient
              asset={this.state.asset}
              notify={this.props.notify}
              fetchAssets={this.props.fetchAssets}
              fetchClients={this.props.fetchClients}
              clients={this.props.clients}
            />
          </TabContainer>
        </SwipeableViews>
      </StyledDiv>
    );
  }
}

AssetTabView.propTypes = {
  asset: PropTypes.object,
  classes: PropTypes.object,
  theme: PropTypes.object,
  notify: PropTypes.func.isRequired,
  updateAssetState: PropTypes.func.isRequired,
  showUpdateButton: PropTypes.func.isRequired
};

export default (AssetTabView);
