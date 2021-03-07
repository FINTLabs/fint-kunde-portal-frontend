import React from "react";
import Chip from "@material-ui/core/Chip";
import {withStyles} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    chip: {
        margin: theme.spacing(0.5),
    },
});

function OpenDataLabel(props) {
    const {classes} = props;
    return (
        <Tooltip
            placement="top"
            title="Dette er åpne data som ikke trenger å tilordnes organisasjonen. Denne komponenten trenger ikke adapter eller klienter."
        >
            <Chip
                size="small"
                variant="outlined"
                label="Åpne Data"
                className={classes.chip}
            />
        </Tooltip>
    );
}

export default withStyles(styles)(OpenDataLabel);
