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
import AdapterApi from "../../../data/api/AdapterApi";
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

class AdapterAdd extends React.Component {
  updateAdapterState = event => {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({ adapter: adapter });
  };

  updateShortDescription = (event, MaxLength) => {
    if (event.target.value.length >= MaxLength) {
      this.setState({showSmallDescError: true, smallDescErrorMessage: "Maks karakterer brukt."})
    }
    else {
      this.setState({showSmallDescError: false, smallDescErrorMessage: ""})
    }
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({ adapter: adapter });
  };

  updateNote = (event, MaxLength) => {
    if (event.target.value.length >= MaxLength) {
      this.setState({showNoteError: true, noteErrorMessage: "Maks karakterer brukt."})
    }
    else {
      this.setState({showNoteError: false, noteErrorMessage: ""})
    }
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({ adapter: adapter });
  };

  handleAddAdapter = () => {
    AdapterApi.createAdapter(this.state.adapter, this.props.organisation.name)
      .then(response => {
        if (response.status === 201) {
          this.props.afterAdd();
          this.props.notify("Adapteret ble opprettet");
        } else if (response.status === 302) {
          this.props.notify(
            `Adapteret "${this.state.adapter.name}" finnes fra før av. `
          );
        } else {
          this.props.notify(
            "Oisann, dette gikk ikke helt etter planen! Prøv igjen ;)"
          );
        }
        this.setState({
          showAdapterAdd: false,
          notify: true,
          adapter: this.getEmptyAdapter()
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
            showAdapterAdd: true,
            notify: false,
            realm: `@adapter.${json.assetId}`
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
    this.setState({ showAdapterAdd: false, notify: false });
  };

  getEmptyAdapter = () => {
    return {
      name: "",
      shortDescription: "",
      note: ""
    };
  };
  isFormValid = () => {
    return (
      this.state.usernameIsValid &&
      this.state.adapter.shortDescription.length > 0 &&
      this.state.adapter.shortDescription.length < 64 &&
      this.state.adapter.note.length > 0 &&
      this.state.adapter.note.length < 900
    );
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      adapter: this.getEmptyAdapter(),
      showAdapterAdd: false,
      usernameIsValid: false,
      showSmallDescError: false,
      SmallDescErrorMessage: "",
      showNoteError: false,
      noteErrorMessage: ""
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
            id={"adapterAddFAB"}
          >
            <Add />
          </Fab>
          <Dialog
            open={this.state.showAdapterAdd}
            onClose={this.handleAddAdapter}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
          >
            <DialogTitle id="form-dialog-title">Nytt adapter</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til ny
                adapter.
              </DialogContentText>
              <UsernameValidationInput
                title="Brukernavn"
                name="name"
                onChange={event => this.updateAdapterState}
                usernameIsValid={this.usernameIsValid}
                realm={this.state.realm}
              />
              <TextField
                name="shortDescription"
                label="Kort beskrivelse"
                required
                fullWidth
                onChange={event => this.updateShortDescription(event, 64)}
                inputProps={{ maxLength: 64 }}
                id={"newAdapterShortDesc"}
                error={this.state.showSmallDescError}
                helperText={this.state.smallDescErrorMessage}
              />
              <TextField
                name="note"
                label="Note"
                fullWidth
                required
                multiline
                rows="4"
                onChange={event => this.updateNote(event, 900)}
                id={"newAdapterNote"}
                inputProps={{ maxLength: 900 }}
                error={this.state.showNoteError}
                helperText={this.state.noteErrorMessage}
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
                onClick={this.handleAddAdapter}
                variant="contained"
                color="primary"
                id={"addNewAdapterButton"}
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

AdapterAdd.propTypes = {};

export default withStyles(styles)(AdapterAdd);
