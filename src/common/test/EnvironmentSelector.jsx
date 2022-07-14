import React from "react";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import {makeStyles} from "@mui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

export default function EnvironmentSelector(props) {
    const classes = useStyles();
    const {name, value} = props;

    const inputLabel = React.useRef();
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl
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
                input={<OutlinedInput labelWidth={labelWidth} name={name} id={name}/>}
            >
                <MenuItem value="https://play-with-fint.felleskomponent.no">
                    Play-With-FINT
                </MenuItem>
                <MenuItem value="https://beta.felleskomponent.no">Beta</MenuItem>
                <MenuItem value="https://api.felleskomponent.no">
                    Produksjon
                </MenuItem>
            </Select>
        </FormControl>
    );

}

EnvironmentSelector.propTypes = {
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

