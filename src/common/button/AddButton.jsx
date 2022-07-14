import PropTypes from "prop-types";
import React, { Component } from "react";
import { Tooltip, IconButton } from '@mui/material';
import { withStyles } from '@mui/styles';

import AddIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const styles = theme => ({
  addIcon: {
    //color: theme.palette.secondary.main
  }
});
class AddButton extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Tooltip placement={this.props.placement} title={this.props.title}>
        <IconButton aria-label="Add" onClick={this.props.onClick}>
          <AddIcon className={classes.addIcon} />
        </IconButton>
      </Tooltip>
    );
  }
}

AddButton.defaultProps = {
  placement: "top"
};

AddButton.propTypes = {
  classes: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  placement: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
export default withStyles(styles)(AddButton);
