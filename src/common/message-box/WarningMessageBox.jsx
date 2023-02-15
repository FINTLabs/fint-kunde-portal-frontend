import React from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import PropTypes from "prop-types";
import WarningIcon from "@mui/icons-material/Warning";

const PREFIX = 'WarningMessageBox';

const classes = {
  warningIcon: `${PREFIX}-warningIcon`,
  text: `${PREFIX}-text`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.warningIcon}`]: {
    color: theme.palette.primary.main,
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
      <Root>
        <Dialog
          open={this.state.open}
          // onClose={this.handleClose}
          onClose={(event, reason) => {
            if (reason !== 'backdropClick') {
              this.handleClose();
            }
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown
          // disableBackdropClick
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent className={classes.content}>
            <WarningIcon className={classes.warningIcon} />
            <DialogContentText
              className={classes.text}
              id="warning-dialog-content"
            >
              {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleClose(true)}
              variant="contained"
              color="primary"
              autoFocus
              id={"confirm"}
            >
              Ja
            </Button>
            <Button
              onClick={() => this.handleClose(false)}
              variant="contained"
              color="primary"
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
  title: "Advarsel"
};

WarningMessageBox.propTypes = {
  classes: PropTypes.any,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};
export default (WarningMessageBox);
