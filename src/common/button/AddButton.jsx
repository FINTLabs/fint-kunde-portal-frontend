import PropTypes from "prop-types";
import React, { Component } from "react";
import { Tooltip, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/CheckBoxOutlineBlank";


class AddButton extends Component {
  render() {
    return (
      <Tooltip placement={this.props.placement} title={this.props.title}>
        <IconButton aria-label="Add" onClick={this.props.onClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

AddButton.defaultProps = {
  placement: "top"
};

AddButton.propTypes = {
  classes: PropTypes.any,
  onClick: PropTypes.func,
  placement: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
export default (AddButton);
