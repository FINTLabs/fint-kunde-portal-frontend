import React, {Component} from "react";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import {IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadReportIcon from "@mui/icons-material/GetApp";
import LinkWalkerApi from "../../data/api/LinkWalkerApi";
import LinkWalkerTestView from "./LinkWalkerTestView";
import TrafficLight from "../../common/status/TrafficLight";
import FeatureHelperText from "../../common/help/FeatureHelperText";

const PREFIX = 'LinkWalkerTestList';

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  statusFailed: `${PREFIX}-statusFailed`,
  statusRunning: `${PREFIX}-statusRunning`,
  statusOk: `${PREFIX}-statusOk`,
  button: `${PREFIX}-button`,
  title: `${PREFIX}-title`,
  help: `${PREFIX}-help`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    width: "90%",
    overflowX: "auto"
  },

  [`& .${classes.table}`]: {
    minWidth: 700
  },

  [`& .${classes.statusFailed}`]: {
    color: "red"
  },

  [`& .${classes.statusRunning}`]: {
    color: "#f4a142"
  },

  [`& .${classes.statusOk}`]: {
    color: "green"
  },

  [`& .${classes.button}`]: {
    margin: theme.spacing(1)
  },

  [`& .${classes.title}`]: {
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },

  [`& .${classes.help}`]: {
    margin: theme.spacing(1) / 2
  }
}));

class LinkWalkerTestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLinkWalkerTestView: false
    };
  }

  getStatusClass = status => {
    if (status === "OK") return this.props.classes.statusOk;
    if (status === "RUNNING") return this.props.classes.statusRunning;
    if (status === "FAILED") return this.props.classes.statusFailed;
  };

  refreshTestList = () => {
    const { organisationName } = this.props;
    this.props.fetchLinkWalkerTests(
      organisationName
    );
  };

  clearTests = () => {
    const { organisationName } = this.props;
    LinkWalkerApi.clearTests(organisationName)
    .then(response => {
      if (response.status === 200) {
        this.props.notify("Testloggen ble slette!");
        this.props.fetchLinkWalkerTests(
          organisationName
        );
      } else {
        this.props.notify("Oh no, noe gikk galt!");
      }
    });
  };

  getDownloadUrl = test => {
    const { organisationName } = this.props;
    return `/api/tests/${organisationName}/links/${test.id}/download`;
  };

  closeTestView = () => {
    this.setState({ showLinkWalkerTestView: false });
  };

  render() {
    const { tests, } = this.props;
    return (
      <Root className={classes.root}>
        <div className={classes.help}>
          <FeatureHelperText>
            En relasjonstest sjekker at alle relasjonene i en komponent virker.
          </FeatureHelperText>
        </div>
        <Typography variant="h5" className={classes.title}>
          Relasjonstest
        </Typography>

        <IconButton
          className={classes.button}
          aria-label="Refresh"
          color="primary"
          onClick={() => this.refreshTestList()}
        >
          <RefreshIcon />
        </IconButton>
        <IconButton
          className={classes.button}
          aria-label="Refresh"
          color="primary"
          onClick={() => this.clearTests()}
        >
          <ClearIcon />
        </IconButton>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Tid</TableCell>
                <TableCell>Ressurs</TableCell>
                <TableCell>Beskrivelse av feil</TableCell>
                <TableCell align="right">Gjenstående sjekker</TableCell>
                <TableCell>Last ned rapport</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map(test => {
                return (
                  <TableRow key={test.id} hover>
                    <TableCell>
                      <TrafficLight status={test.status} />
                    </TableCell>
                    <TableCell>{test.time}</TableCell>
                    <TableCell>
                      {test.testRequest.baseUrl + test.testRequest.endpoint}
                    </TableCell>
                    <TableCell>{test.reason}</TableCell>
                    <TableCell numeric>{test.remaining}</TableCell>
                    <TableCell>
                      {test.status !== "RUNNING" && (
                        <Tooltip placement="top" title="Last ned rapport">
                          <a href={this.getDownloadUrl(test)}>
                            <IconButton component="span">
                              <DownloadReportIcon />
                            </IconButton>
                          </a>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        <LinkWalkerTestView
          showLinkWalkerTestView={this.state.showLinkWalkerTestView}
          closeTestView={this.closeTestView}
          test={this.state.test}
          organisationName={this.props.organisationName}
        />
      </Root>
    );
  }
}

LinkWalkerTestList.propTypes = {
  classes: PropTypes.any,
  tests: PropTypes.any.isRequired
};

export default (LinkWalkerTestList);
