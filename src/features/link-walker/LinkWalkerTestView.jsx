import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Divider
} from "@mui/material";
import PropTypes from "prop-types";
import TrafficLight from "../../common/status/TrafficLight";
import CvsReport from "./CvsReport";
import downloadCsv from "download-csv";
import dateFormat from "dateformat";
import LinkWalkerApi from "../../data/api/LinkWalkerApi";

const PREFIX = 'LinkWalkerTestView';

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  tableHeader: `${PREFIX}-tableHeader`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    width: "100%",
    overflowX: "auto"
  },

  [`& .${classes.table}`]: {
    minWidth: "100%"
  },

  [`& .${classes.tableHeader}`]: {
    fontWeight: "bold",
    fontStyle: "italic"
  }
}));

class LinkWalkerTestView extends React.Component {
  handleClose = () => {
    this.setState({ showLinkWalkerTestView: false });
    this.props.closeTestView();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.showLinkWalkerTestView !== prevState.showLinkWalkerTestView) {
      return {
        showLinkWalkerTestView: nextProps.showLinkWalkerTestView
      };
    }

    return null;
  }

  downloadTestToJson = test => {
    const { organisationName } = this.props;
    LinkWalkerApi.getAllTestResults(organisationName, test.id)
    .then(([response, json]) => {
      if (response.status === 200) {
        downloadCsv(
          CvsReport.getReport(json),
          null,
          `${organisationName}_relasjonstest_${dateFormat(
            new Date(),
            "ddmmyyyyHHMMssl"
          )}.csv`
        );
      }
    });
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      showLinkWalkerTestView: props.showLinkWalkerTestView
    };
  }

  render() {
    if (this.props.test !== undefined) {
      return this.renderTestView();
    }
    return <Root />;
  }

  renderTestView() {
    const test = Object.assign({}, this.props.test);
    const relations = Object.entries(test.relations);
    return (
      <div>
        <div>
          <Dialog
            open={this.state.showLinkWalkerTestView}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            fullScreen
          >
            <DialogTitle id="form-dialog-title">Detaljer</DialogTitle>
            <DialogContent>
              <Paper>
                <Table className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>
                        Status
                      </TableCell>
                      <TableCell>
                        <TrafficLight status={test.status} />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>Tid</TableCell>
                      <TableCell>{test.time}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>
                        Ressurs
                      </TableCell>
                      <TableCell>
                        {test.testRequest.baseUrl + test.testRequest.endpoint}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>
                        Beskrivelse av feil
                      </TableCell>
                      <TableCell>{test.reason}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tableHeader}>
                        Gjenstående sjekker
                      </TableCell>
                      <TableCell>{test.remaining}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>

              {relations.length > 0 && (
                <div>
                  <h3>Detaljert feil beskrivelse</h3>
                  <Divider />
                </div>
              )}

              {relations.map(relation => {
                const relationName = relation[0];
                const reports = relation[1];
                if (reports.length === 0) {
                  return (
                    <div key={relationName}>
                      <h4>{relationName}</h4>
                      <Typography variant="caption">Ingen feil</Typography>
                    </div>
                  );
                } else {
                  return (
                    <div key={relationName}>
                      <h4>{relationName}</h4>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Status</TableCell>
                            <TableCell>Url</TableCell>
                            <TableCell>Beskrivelse av feil</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {reports.map(report => {
                            return (
                              <TableRow hover key={report.url}>
                                <TableCell>
                                  <TrafficLight status={report.status} />
                                </TableCell>
                                <TableCell>{report.url}</TableCell>
                                <TableCell>{report.reason}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  );
                }
              })}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.downloadTestToJson(test)}
                variant="contained"
                color="primary"
              >
                Last ned test rapport (.csv)
              </Button>
              <Button
                onClick={this.handleClose}
                variant="contained"
                color="primary"
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

LinkWalkerTestView.propTypes = {
  classes: PropTypes.any,
  closeTestView: PropTypes.any.isRequired,
  showLinkWalkerTestView: PropTypes.any.isRequired,
  test: PropTypes.any
};

export default (LinkWalkerTestView);
