import PropTypes from "prop-types";
import React, { Component } from "react";
import { withStyles, Paper } from "@material-ui/core";
import classNames from "classnames";
import Box from "@material-ui/core/Box";

const styles = theme => ({
  helpText: {
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(),
    paddingBottom: theme.spacing(),
    backgroundColor: theme.palette.grey[200],
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.body1.fontWeight
  },
  closeButton: {
    float: "right",
    cursor: "pointer",
    color: theme.palette.grey[500],
    "&:hover": {
      color: theme.palette.grey[700]
    }
  },
  closeButtonContainer: {
    height: theme.spacing(1.5)
  },
  hide: {
    display: "none"
  }
});

class FeatureHelperText extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: props.show
    };
  }

  close = () => {
    this.setState({ show: false });
  };

  render() {
    const { classes } = this.props;
    const { show } = this.state;
    const classHidden = classNames({
      [classes.hide]: !show
    });
    return (
      <div className={classHidden}>
        <Box className={classes.helpText} borderRadius={5} mt={4}>{this.props.children}</Box>
      </div>
    );
    /*
    return (
      <div className={classHidden}>
        <Paper className={classes.helpText}>
          <div className={classes.closeButtonContainer}>
            <CloseIcon className={classes.closeButton} onClick={() => this.close()}/>
          </div>
          {this.props.children}
        </Paper>
      </div>
    );
    */
  }
}

FeatureHelperText.defaultProps = {
  show: true
};

FeatureHelperText.propTypes = {
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
};
export default withStyles(styles)(FeatureHelperText);
