import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import React, { Component } from "react";
import { Tooltip, IconButton } from '@mui/material';

import AddIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const PREFIX = 'AddButton';

const classes = {
  addIcon: `${PREFIX}-addIcon`
};

const StyledTooltip = styled(Tooltip)((
  {
    theme
  }
) => ({
  [`& .${classes.addIcon}`]: {
    //color: theme.palette.secondary.main
  }
}));

class AddButton extends Component {
  render() {
    const { } = this.props;
    return (
      <StyledTooltip placement={this.props.placement} title={this.props.title}>
        <IconButton aria-label="Add" onClick={this.props.onClick}>
          <AddIcon className={classes.addIcon} />
        </IconButton>
      </StyledTooltip>
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
