import React from 'react';
import {Fab} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import * as PropTypes from "prop-types";

const ToolTipFab = (props) => {
    const {color, onClick, toolTip, children, className} = props;

    return (
        <Tooltip title={toolTip}>
            <Fab
                color={color}
                onClick={onClick}
                className={className}
            >
                {children}
            </Fab>
        </Tooltip>
    );
};

ToolTipFab.propTypes = {
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    toolTip: PropTypes.string.isRequired
}
export default ToolTipFab;
