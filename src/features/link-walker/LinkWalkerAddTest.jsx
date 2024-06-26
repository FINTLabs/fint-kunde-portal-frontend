import React from "react";
import {css, styled} from "@mui/material/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from "@mui/material";

import { Add } from "@mui/icons-material";
import LinkWalkerApi from "../../data/api/LinkWalkerApi";
import PropTypes from "prop-types";
import ClientSelector from "../../common/test/ClientSelector";
import ComponentSelector from "../../common/test/ComponentSelector";
import EnvironmentSelector from "../../common/test/EnvironmentSelector";

const PREFIX = 'LinkWalkerAddTest';

const classes = {
  addButton: `${PREFIX}-addButton`
};

const Root = styled('div')(() => ({
  [`& .${classes.addButton}`]: {
    margin: 0,
    top: 100,
    left: "auto",
    bottom: "auto",
    right: 50,
    position: "fixed"
  }
}));

class LinkWalkerAddTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLinkWalkerAddTest: false,
      baseUrl: "",
      endpoint: "",
      orgId: "pwf.no",
      client: ""
    };
  }

  handleChange = e => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  openAddDialog = () => {
    this.setState({ showLinkWalkerAddTest: true, notify: false });
  };

  handleCancel = () => {
    this.setState({ showLinkWalkerAddTest: false, notify: false });
  };

  addTest = () => {
    let test = this.getTest();
    const { organisationName } = this.props;
    LinkWalkerApi.addTest(test, organisationName)
      .then(response => {
        if (response.status === 201) {
          this.props.notify("Testen ble opprettet");
          this.props.fetchLinkWalkerTests(
            organisationName
          );
        } else {
          this.props.notify("Oisann, dette gikk ikke helt etter planen!");
        }

        this.setState({
          showLinkWalkerAddTest: false,
          notify: true,
          test: this.getEmptyTest()
        });
      })
      .catch(() => {
        this.props.notify(
          "Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)"
        );
      });
  };

  getTest = () => {
    return {
      url: this.state.baseUrl + `${this.state.endpoint}/${this.state.resource}`,
      client: this.state.client
    };
  };

  getEmptyTest = () => {
    return {
      baseUrl: "",
      endpoint: "",
      orgId: "pwf.no",
      client: ""
    };
  };

  isFormValid = () => {
    return this.state.endpoint && this.state.baseUrl && this.state.resource;
  };

  render() {
    const { components, } = this.props;
    return (
      <Root>
        <div>
          <Fab
            color="secondary"
            className={classes.addButton}
            onClick={this.openAddDialog}
          >
            <Add />
          </Fab>
          <Dialog
            open={this.state.showLinkWalkerAddTest}
            onClose={this.handleAddClient}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">Ny test</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til en ny
                test.
              </DialogContentText>

              <EnvironmentSelector
                  handleChange={this.handleChange}
                  name="baseUrl"
                  value={this.state.baseUrl}
              />

              <ComponentSelector
                components={components}
                handleChange={this.handleChange}
                name="endpoint"
                value={this.state.endpoint}
              />

              <TextField
                name="resource"
                label="Ressurs"
                required
                fullWidth
                disabled={this.state.endpoint === ""}
                onChange={this.handleChange}
                variant="outlined"
                sx={{
                  padding: '8px'
                }}
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
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCancel}
                variant="contained"
                color="primary"
              >
                Avbryt
              </Button>
              <Button
                disabled={!this.isFormValid()}
                onClick={() => this.addTest()}
                variant="contained"
                color="primary"
              >
                Kjør test
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Root>
    );
  }
}

LinkWalkerAddTest.propTypes = {
  classes: PropTypes.object,
  clients: PropTypes.array.isRequired,
  components: PropTypes.array.isRequired,
  fetchLinkWalkerTests: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  organisationName: PropTypes.string.isRequired
};

export default (LinkWalkerAddTest);
