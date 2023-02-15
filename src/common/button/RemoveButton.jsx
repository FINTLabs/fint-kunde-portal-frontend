import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import React, { Component } from "react";
import { IconButton, Tooltip } from "@mui/material";
import RemoveIcon from "@mui/icons-material/CheckBox";

const classes = {
  removeIcon: `RemoveButton-removeIcon`
};

const StyledTooltip = styled(Tooltip)((
  {
    theme
  }
) => ({
  [`& .${classes.removeIcon}`]: {
    color: theme.palette.secondary.main
  }
}));

class RemoveButton extends Component {
  render() {
    return (
      <StyledTooltip placement={this.props.placement} title={this.props.title}>
        <IconButton aria-label="Remove" onClick={this.props.onClick}>
          <RemoveIcon className={classes.removeIcon} />
        </IconButton>
      </StyledTooltip>
    );
  }
}

RemoveButton.defaultProps = {
  placement: "top"
};

RemoveButton.propTypes = {
  classes: PropTypes.any,
  onClick: PropTypes.func,
  placement: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
export default (RemoveButton);
