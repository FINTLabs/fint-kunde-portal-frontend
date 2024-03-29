import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import ComponentApi from "../../data/api/ComponentApi";
import LoadingProgress from "../../common/status/LoadingProgress";
import ComponentSelector from "../../common/test/ComponentSelector";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import EnvironmentSelector from "../../common/test/EnvironmentSelector";
import ClientSelector from "../../common/test/ClientSelector";
import PropTypes from "prop-types";
import { withContext } from "../../data/context/withContext";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchClients } from "../../data/redux/dispatchers/client";
import BasicTestApi from "../../data/api/BasicTestApi";
import BasicTestRunButton from "./BasicTestRunButton";
import TrafficLight from "../../common/status/TrafficLight";
import HealthTestApi from "../../data/api/HealthTestApi";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import TestAuthApi from "../../data/api/TestAuthApi";

const PREFIX = 'BasicTestContainer';

const classes = {
  root: `${PREFIX}-root`,
  testForm: `${PREFIX}-testForm`,
  formControls: `${PREFIX}-formControls`,
  formActions: `${PREFIX}-formActions`,
  healthStatusLight: `${PREFIX}-healthStatusLight`,
  healthStatusMessage: `${PREFIX}-healthStatusMessage`,
  resourceCell: `${PREFIX}-resourceCell`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    justifyContent: "center"
  },

  [`& .${classes.testForm}`]: {
    width: "75%"
  },

  [`& .${classes.formControls}`]: {
    marginTop: theme.spacing(1)
  },

  [`& .${classes.formActions}`]: {
    display: "inline-block",
    marginTop: theme.spacing(2),
    borderBottom: "lightgray dotted 1px",
    width: "100%"
  },

  [`& .${classes.healthStatusLight}`]: {},
  [`& .${classes.healthStatusMessage}`]: {},

  [`& .${classes.resourceCell}`]: {
    textTransform: "capitalize"
  }
}));

class BasicTestContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notify: false,
      notifyMessage: "",
      components: [],
      endpoint: "",
      baseUrl: "",
      client: "",
      runningTest: false,
      loading: false,
      success: true,
      testCases: []
    };
  }

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

  getOrganisationComponents = organisationName => {
    ComponentApi.getOrganisationComponents(organisationName).then(
      ([response, json]) => {
        if (response.status === 200) {
          this.setState({ components: json });
        }
      }
    );
  };

  componentDidMount() {
    const { currentOrganisation } = this.props.context;
    this.props.fetchClients(currentOrganisation.name);
    this.getOrganisationComponents(currentOrganisation.name);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentOrganisation } = this.props.context;
    if (prevProps.context !== this.props.context) {
      this.props.fetchClients(currentOrganisation.name);
      this.getOrganisationComponents(currentOrganisation.name);
    }
  }

  handleChange = e => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  getTest = () => {
    return {
      endpoint: `${this.state.endpoint}`,
      baseUrl: this.state.baseUrl
    };
  };

  runTest = () => {
    this.setState({
      loading: true,
      success: false,
      testCases: [],
      healthResult: {}
    });
    this.notify("Testen ble startet!");
    const test = this.getTest();
    const { currentOrganisation } = this.props.context;
    const orgName = currentOrganisation.name;

    this.setState({ healthResult: { status: "RUNNING", healthData: [] } });

    TestAuthApi.authInit(orgName, this.state.client, test)
      .then(([response]) => {
        if (response.status < 400) {
          BasicTestApi.runTest(orgName, test)
            .then(([response, json]) => {
              if (response.status === 200) {
                this.setState({ testCases: json.cases });
              } else {
                this.notify("Oisann, dette gikk ikke helt etter planen!");
              }
              this.setState({
                loading: false,
                success: true
              });
            })
            .catch(() => {
              this.notify(
                "Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)"
              );
              this.setState({
                loading: false,
                success: true
              });
            });

          HealthTestApi.runTest(orgName, test)
            .then(([response, json]) => {
              if (response.status === 200) {
                this.setState({ healthResult: json });
              } else {
                this.notify("Oisann, dette gikk ikke helt etter planen!");
              }
            })
            .catch(() => {
              this.notify(
                "Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)"
              );
            });
        }
      })
      .catch(e => {
        this.notify("Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)");
      });
  };

  getDateFromUnixTimeStamp = timestamp => {
    let date = new Date(timestamp);
    return date.toISOString();
  };
  isFormValid = () => {
    return this.state.endpoint && this.state.baseUrl;
  };

  render() {
    if (
      this.props.context.currentOrganisation === undefined
    ) {
      return <LoadingProgress />;
    } else {
      return this.renderContainer();
    }
  }

  renderContainer() {
    const { testCases, healthResult } = this.state;

    return (
      <Root className={classes.root}>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}
        />

        <div className={classes.testForm}>
          <FeatureHelperText>
            <p>
              En basistest undersøker om alle delene i FINT komponenten fungerer
              som de skal. I tillegg sjekker den om cachen har data og at de
              nylig ble oppdatert.
            </p>
            <p>
              Dette er greit å kjøre i feilsøkingssammenheng. Det er også et
              krav å sende med resultatet av denne testen før man kontakter
              support.
            </p>
          </FeatureHelperText>
          <div className={classes.title}>
            <Typography variant="h5">Basistest</Typography>
          </div>
          <div className={classes.formControls}>
            <ComponentSelector
              components={this.state.components}
              handleChange={this.handleChange}
              name={"endpoint"}
              value={this.state.endpoint}
            />
            <EnvironmentSelector
              handleChange={this.handleChange}
              name={"baseUrl"}
              value={this.state.baseUrl}
            />
            <ClientSelector
              handleChange={this.handleChange}
              name="client"
              value={this.state.client}
              clients={this.props.clients}
              disabled={
                this.state.baseUrl ===
                  "https://play-with-fint.felleskomponent.no" ||
                this.state.baseUrl === "" ||
                this.state.endpoint === ""
              }
            />
          </div>
          <div className={classes.formActions}>
            <BasicTestRunButton
              disabled={!this.isFormValid()}
              onClick={() => this.runTest()}
              loading={this.state.loading}
              success={this.state.success}
            />
          </div>

          <div>
            <h4>Helsestatus</h4>

            <div>
              {healthResult && (
                <div>
                  <div>
                    <Table className={classes.table} >
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <TrafficLight status={healthResult.status} />
                          </TableCell>
                          <TableCell size="small">
                            <Typography variant="subtitle1">
                              {healthResult.message}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <Table className={classes.table} id={"healthTable"}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Status</TableCell>
                          <TableCell>Component</TableCell>
                          <TableCell>Time</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {healthResult.healthData.map(h => {
                          return (
                            <TableRow hover key={h.status}>
                              <TableCell>{h.status}</TableCell>
                              <TableCell>{h.component}</TableCell>
                              <TableCell>{h.time}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h4>Cache status</h4>
            <Table className={classes.table} id={"cacheTable"}>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Ressurs</TableCell>
                  <TableCell>Sist oppdatert</TableCell>
                  <TableCell>Cache størrelse</TableCell>
                  <TableCell>Melding</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testCases.map(c => {
                  return (
                    <TableRow hover key={c.resource}>
                      <TableCell>
                        <TrafficLight status={c.status} />
                      </TableCell>
                      <TableCell className={classes.resourceCell}>
                        {c.resource}
                      </TableCell>
                      <TableCell>
                        {this.getDateFromUnixTimeStamp(c.lastUpdated)}
                      </TableCell>
                      <TableCell>{c.size}</TableCell>
                      <TableCell>{c.message}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Root>
    );
  }
}

BasicTestContainer.defaultProps = {
  clients: []
};

BasicTestContainer.propTypes = {
  clients: PropTypes.array.isRequired,
  context: PropTypes.object.isRequired,
  fetchClients: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    clients: state.client.clients
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchClients: fetchClients
    },
    dispatch
  );
}

export default (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withContext(BasicTestContainer))
);
