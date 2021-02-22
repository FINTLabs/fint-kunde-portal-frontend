import React from "react";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
  Fab
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Add } from "@material-ui/icons";
import UsernameValidationInput from "../../../common/input-validation/UsernameValidationInput";
import ClientApi from "../../../data/api/ClientApi";
import AssetApi from "../../../data/api/AssetApi";

const styles = () => ({
  addButton: {
    margin: 0,
    top: 100,
    left: "auto",
    bottom: "auto",
    right: 50,
    position: "fixed"
  }
});

class ClientAdd extends React.Component {
  updateClientState = event => {
    const field = event.target.name;
    const client = this.state.client;
    client[field] = event.target.value;
    return this.setState({ client: client });
  };

  handleAddClient = () => {
    ClientApi.createClient(this.state.client, this.props.organisation.name)
      .then(response => {
        if (response.status === 201) {
          this.props.afterAdd();
          this.props.notify("Klienten ble opprettet");
        } else if (response.status === 302) {
          this.props.notify(
            `Klienten "${this.state.client.name}" finnes fra før av. `
          );
        } else {
          this.props.notify(
            "Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)"
          );
        }
        this.setState({
          showClientAdd: false,
          notify: true,
          client: this.getEmptyClient()
        });
      })
      .catch(() => {
        this.props.notify(
          "Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)"
        );
      });
  };

  usernameIsValid = valid => {
    this.setState({ usernameIsValid: valid });
  };

  openAddDialog = () => {
    AssetApi.getPrimaryAsset(this.props.organisation.name).then(
      ([response, json]) => {
        if (response.status === 200) {
          this.setState({
            showClientAdd: true,
            notify: false,
            realm: `@client.${json.assetId}`
          });
        } else {
          this.props.notify(
            "Det oppstod problemer med å hente primær ressurs id."
          );
        }
      }
    );
  };

  handleCancel = () => {
    this.setState({ showClientAdd: false, notify: false });
  };

  getEmptyClient = () => {
    return {
      name: "",
      shortDescription: "",
      note: ""
    };
  };
  isFormValid = () => {
    return (
      this.state.usernameIsValid &&
      this.state.client.shortDescription.length > 0 &&
      this.state.client.note.length > 0
    );
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      client: this.getEmptyClient(),
      showClientAdd: false,
      usernameIsValid: false
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Fab
            color="secondary"
            className={classes.addButton}
            onClick={this.openAddDialog}
            id={"clientAddFAB"}
          >
            <Add />
          </Fab>
          <Dialog
            open={this.state.showClientAdd}
            onClose={this.handleAddClient}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">Nytt client</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til en ny
                klient.
              </DialogContentText>
              <UsernameValidationInput
                title="Brukernavn"
                name="name"
                onChange={this.updateClientState}
                usernameIsValid={this.usernameIsValid}
                className={classes.username}
                realm={this.state.realm}
              />
              <TextField
                name="shortDescription"
                label="Kort beskrivelse"
                required
                fullWidth
                onChange={this.updateClientState}
                id={"newClientShortDesc"}
              />
              <TextField
                name="note"
                label="Note"
                fullWidth
                required
                multiline
                rows="4"
                onChange={this.updateClientState}
                id={"newClientNote"}
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
                onClick={this.handleAddClient}
                variant="contained"
                color="primary"
                id={"addNewClientButton"}
              >
                Legg til
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

ClientAdd.propTypes = {};

export default withStyles(styles)(ClientAdd);
