import React from "react";
import { styled } from "@mui/material/styles";
import { Chip, Tooltip} from "@mui/material";
const PREFIX = 'OpenDataLabel';

const classes = {
    chip: `${PREFIX}-chip`
};

const StyledTooltip = styled(Tooltip)((
    {
        theme
    }
) => ({
    [`& .${classes.chip}`]: {
        margin: theme.spacing(0.5),
    }
}));

function OpenDataLabel(props) {
    // const {classes} = props;
    return (
        <StyledTooltip
            placement="top"
            title="Dette er åpne data som ikke trenger å tilordnes organisasjonen. Denne komponenten trenger ikke adapter eller klienter."
        >
            <Chip
                size="small"
                variant="outlined"
                label="Åpne Data"
                className={classes.chip}
            />
        </StyledTooltip>
    );
}

export default (OpenDataLabel);
