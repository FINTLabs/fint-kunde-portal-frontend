import React from 'react';
import {IconButton, Tooltip} from "@material-ui/core";
import Proptypes from "prop-types";

const TooltipIconButton = ({toolTip, id, ariaLabel, onClick, children}) => {
    return (
        <Tooltip title={toolTip}>
            <IconButton
                aria-label={ariaLabel}
                onClick={onClick}
                id={id}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
};

TooltipIconButton.propTypes = {
    toolTip: Proptypes.string.isRequired,
    id: Proptypes.string,
    ariaLabel: Proptypes.string,
    onClick: Proptypes.func.isRequired
}
export default TooltipIconButton;
