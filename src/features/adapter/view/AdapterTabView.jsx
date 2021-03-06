import React from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import { Tab, Tabs } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import TabContainer from "../../../common/tab/TabContainer";
import PropTypes from "prop-types";
import AdapterTabComponent from "./AdapterTabComponent";
import AdapterTabGeneral from "./AdapterTabGeneral";
import AdapterTabAuthenticationInformation from "./AdapterTabAuthenticationInformation";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
});

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
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
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
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <AdapterTabGeneral
              adapter={this.props.adapter}
              updateAdapterState={this.props.updateAdapterState}
            />
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <AdapterTabComponent
              adapter={this.props.adapter}
              notify={this.props.notify}
            />
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <AdapterTabAuthenticationInformation
              adapter={this.props.adapter}
              notify={this.props.notify}
            />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

AdapterTabView.propTypes = {
  adapter: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired,
  updateAdapterState: PropTypes.func.isRequired,
  showUpdateButton: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AdapterTabView);
