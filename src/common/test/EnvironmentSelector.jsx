import React from "react";
import { styled } from "@mui/material/styles";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";

const PREFIX = 'EnvironmentSelector';

const classes = {
    formControl: `${PREFIX}-formControl`
};

const StyledFormControl = styled(FormControl)((
    {
        theme
    }
) => ({
    [`&.${classes.formControl}`]: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

export default function EnvironmentSelector(props) {

    const {name, value} = props;

    const inputLabel = React.useRef();

    return (
        <StyledFormControl
            fullWidth
            required
            variant="outlined"
            className={classes.formControl}
        >
            <InputLabel ref={inputLabel} htmlFor={name}>Miljø</InputLabel>
            <Select
                id={"enviromentSelector"}
                value={value}
                onChange={props.handleChange}
                input={<OutlinedInput label={"Miljø"} name={name} id={name}/>}
            >
                <MenuItem value="https://play-with-fint.felleskomponent.no">
                    Play-With-FINT
                </MenuItem>
                <MenuItem value="https://beta.felleskomponent.no">Beta</MenuItem>
                <MenuItem value="https://api.felleskomponent.no">
                    Produksjon
                </MenuItem>
            </Select>
        </StyledFormControl>
    );

}

EnvironmentSelector.propTypes = {
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

