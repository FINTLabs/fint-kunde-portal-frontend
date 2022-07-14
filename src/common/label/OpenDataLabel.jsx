import React from "react";
import { Chip, Tooltip} from "@mui/material";
import { withStyles } from '@mui/styles';


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
