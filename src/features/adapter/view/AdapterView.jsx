import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import React from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import AdapterTabView from "./AdapterTabView";
import AutoHideNotification from "../../../common/notification/AutoHideNotification";

const PREFIX = 'AdapterView';
const classes = {};
const Root = styled('div')(() => ({}));

class AdapterView extends React.Component {
  showUpdateButton = show => {
    this.setState({ showUpdateButton: show });
  };

  notify = message => {
    this.setState({
      notify: true,
      notifyMessage: message
    });
  };

  updateAdapterState = event => {
    const field = event.target.name;
    const adapter = this.state.adapter;
    adapter[field] = event.target.value;
    return this.setState({
      value: event.target.value
    });
  };

  handleUpdate = () => {
    this.props.updateAdapter(this.state.adapter);
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
      adapter: this.props.adapter,
      isSaving: true,
      copiedToClipboard: false,
      notify: false,
      notifyMessage: "",
      showUpdateButton: true
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.adapter !== prevState.adapter) {
      return {
        adapter: nextProps.adapter
      };
    }

    return null;
  }

  render() {
    return (
      <Root>
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
            <DialogTitle id="form-dialog-title">Oppdater adapter</DialogTitle>
            <DialogContent>
              <AdapterTabView
                adapter={this.state.adapter}
                onCopy={this.onCopy}
                updateAdapterState={this.updateAdapterState}
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
      </Root>
    );
  }
}

AdapterView.defaultProps = {
  open: false
};

AdapterView.propTypes = {
  adapter: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  updateAdapter: PropTypes.func.isRequired
};

export default (AdapterView);
