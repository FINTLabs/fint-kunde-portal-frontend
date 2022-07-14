import React from "react";
import { Chip, Tooltip} from "@mui/material";
import { withStyles } from '@mui/styles';

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
