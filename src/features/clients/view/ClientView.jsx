import React from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import { withStyles } from '@mui/styles';
import ClientTabView from "./ClientTabView";
import AutoHideNotification from "../../../common/notification/AutoHideNotification";

const styles = () => ({});

class ClientView extends React.Component {
  showUpdateButton = show => {
    this.setState({ showUpdateButton: show });
  };

  notify = message => {
    this.setState({
      notify: true,
      notifyMessage: message
    });
  };

  updateClientState = event => {
    const field = event.target.name;
    const client = this.state.client;
    client[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });
  };

  handleUpdate = () => {
    this.props.updateClient(this.state.client);
    this.props.onClose();
  };

  handleCancel = () => {
    this.props.onClose();
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
      notifyMessage: ""
    });
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      client: Object.assign({}, this.props.client),
      isSaving: true,
      copiedToClipboard: false,
      notify: false,
      notifyMessage: "",
      showUpdateButton: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.client !== prevState.client) {
      return {
        client: nextProps.client
      };
    }

    return null;
  }

  render() {
    return (
          <div>
            <AutoHideNotification
                showNotification={this.state.notify}
                message={this.state.notifyMessage}
                onClose={this.onCloseNotification}
            />
            <div>
              <Dialog
                  open={this.props.open}
                  onClose={this.handleUpdate}
                  aria-labelledby="form-dialog-title"
                  maxWidth="md"
              >
                <DialogTitle id="form-dialog-title">{`Oppdater klient:`}</DialogTitle>
                <DialogContent>
                  <ClientTabView
                      client={this.state.client}
                      onCopy={this.onCopy}
                      updateClientState={this.updateClientState}
                      notify={this.notify}
                      showUpdateButton={this.showUpdateButton}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                      onClick={this.handleCancel}
                      variant="contained"
                      color="secondary"
                      id={"closeButton"}
                  >
                    {this.state.showUpdateButton ? "Avbryt" : "Lukk"}
                  </Button>
                  {this.state.showUpdateButton ? (
                      <Button
                          onClick={this.handleUpdate}
                          variant="contained"
                          color="secondary"
                          id={"updateButton"}
                      >
                        Oppdater
                      </Button>
                  ) : null}
                </DialogActions>
              </Dialog>
            </div>
          </div>
      );
    }
}

ClientView.propTypes = {};

export default withStyles(styles)(ClientView);
