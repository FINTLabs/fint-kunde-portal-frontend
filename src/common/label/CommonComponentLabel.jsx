import React from "react";
import Chip from "@material-ui/core/Chip";
import {withStyles} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    chip: {
        margin: theme.spacing(0.5),
    }
});

function CommonComponentLabel(props) {
    const {classes} = props;
    return (

        <Tooltip
            placement="top"
            title="Dette er en felles løsning som ikke trenger adapter."
        >
            <Chip
                size="small"
                variant="outlined"
                label="Felles"
                className={classes.chip}
            />
        </Tooltip>
    );
}

export default withStyles(styles)(CommonComponentLabel);
