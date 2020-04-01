import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LogIcon from "@material-ui/icons/Timeline";
import LoadingProgress from "../../common/status/LoadingProgress";
import { Typography, withStyles } from "@material-ui/core";
import moment from "moment";
import LogEntry from "./LogEntry";

const styles = theme => ({
  root: {
    width: "95%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  details: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  distinct = () => {
    let seen = new Map()
    return this.props.log.filter(it => {
      let found = seen.has(it.corrId);
      seen.set(it.corrId, true);
      return !found;
    });
  }

  render() {
    const { classes } = this.props;
    if (this.props.loading === true) {
      return <LoadingProgress />;
    } else {
      return (
        <div className={classes.root}>
          {this.distinct().map(log => (
            <ExpansionPanel TransitionProps={{ unmountOnExit: true }} >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <LogIcon />
                  {moment(log.timestamp).format("HH:mm:ss")} {log.event.action}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                <LogEntry>{log.corrId}</LogEntry>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      );
    }
  }
}

export default withStyles(styles)(LogList);
