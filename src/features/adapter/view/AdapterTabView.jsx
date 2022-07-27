import React from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import { Tab, Tabs } from "@mui/material";
import TabContainer from "../../../common/tab/TabContainer";
import PropTypes from "prop-types";
import AdapterTabComponent from "./AdapterTabComponent";
import AdapterTabGeneral from "./AdapterTabGeneral";
import AdapterTabAuthenticationInformation from "./AdapterTabAuthenticationInformation";
import {styled} from "@mui/material/styles";

const PREFIX = 'AdapterTabView';

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

class AdapterTabView extends React.Component {
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
            <Tab label="Komponenter" id={"adapterTabHeaderComponents"}/>
            <Tab label="Autentisering" id={"adapterTabHeaderAuthenticate"}/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          // axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            axis={"x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer>
            <AdapterTabGeneral
              adapter={this.props.adapter}
              updateAdapterState={this.props.updateAdapterState}
            />
          </TabContainer>

          <TabContainer>
            <AdapterTabComponent
              adapter={this.props.adapter}
              notify={this.props.notify}
            />
          </TabContainer>

          <TabContainer>
            <AdapterTabAuthenticationInformation
              adapter={this.props.adapter}
              notify={this.props.notify}
            />
          </TabContainer>
        </SwipeableViews>
      </StyledDiv>
    );
  }
}

AdapterTabView.propTypes = {
  adapter: PropTypes.object,
  classes: PropTypes.object,
  theme: PropTypes.object,
  notify: PropTypes.func.isRequired,
  updateAdapterState: PropTypes.func.isRequired,
  showUpdateButton: PropTypes.func.isRequired
};

export default (AdapterTabView);
