import React from "react";
import { styled } from "@mui/material/styles";
import { Chip, Tooltip} from "@mui/material";
const PREFIX = 'CommonComponentLabel';

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

function CommonComponentLabel(props) {
    // const {classes} = props;
    return (
        <StyledTooltip
            placement="top"
            title="Dette er en felles løsning som ikke trenger adapter."
        >
            <Chip
                size="small"
                variant="outlined"
                label="Felles"
                className={classes.chip}
            />
        </StyledTooltip>
    );
}

export default (CommonComponentLabel);
