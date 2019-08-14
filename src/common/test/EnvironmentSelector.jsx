import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {makeStyles} from "@material-ui/core";

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

