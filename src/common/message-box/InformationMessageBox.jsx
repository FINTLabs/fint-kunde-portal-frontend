import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import InformationIcon from "@mui/icons-material/Info";

const PREFIX = 'InformationMessageBox';

const classes = {
  icon: `${PREFIX}-icon`,
  text: `${PREFIX}-text`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.icon}`]: {
    color: theme.palette.secondary.main,
    fontSize: "80px",
    float: "left",
    marginRight: theme.spacing(2)
  },

  [`& .${classes.text}`]: {}
}));

class WarningMessageBox extends React.Component {
  handleClose = result => {
    this.setState({ open: false });
    this.props.onClose(result);
  };

  constructor(props) {
    super(props);
    this.state = {
      open: props.show
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show !== prevState.show) {
      return {
        open: nextProps.show
      };
    }

    return null;
  }

  render() {
    return (
      <Root >
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          id={"addContactInformationBox"}
        >
          <DialogTitle id="alert-dialog-title">{"Komponent"}</DialogTitle>
          <DialogContent className={classes.content}>
            <InformationIcon className={classes.icon} />
            <DialogContentText
              className={classes.text}
              id="alert-dialog-description"
            >
              {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleClose(true)}
              variant="contained"
              color="secondary"
              autoFocus
              id={"confirmAddContactButton"}
            >
              Ja
            </Button>
            <Button
              onClick={() => this.handleClose(false)}
              variant="contained"
              color="secondary"
            >
              Nei
            </Button>
          </DialogActions>
        </Dialog>
      </Root>
    );
  }
}

WarningMessageBox.defaultProps = {
  show: false
};
WarningMessageBox.propTypes = {
  classes: PropTypes.any,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default (WarningMessageBox);
