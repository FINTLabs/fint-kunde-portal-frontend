import React, {useEffect, useRef, useState} from "react";
import { FormControl, InputLabel,Select, MenuItem, OutlinedInput } from '@mui/material';
import {makeStyles} from "@mui/styles";
import PropTypes from "prop-types";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import Sort from '../../common/utils/Sort';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));
export default function ComponentSelector(props) {

    const classes = useStyles();
    const {name, value, components, disabled, required, error = false, onClear} = props;

    const inputLabel = useRef();
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl
            disabled={disabled}
            variant="outlined"
            fullWidth
            required={required}
            className={classes.formControl}
            error={error}
        >
            <InputLabel ref={inputLabel} htmlFor={name}>Komponent</InputLabel>
            <Select
                id={"componentSelector"}
                value={value}
                onChange={props.handleChange}
                input={
                    <OutlinedInput
                        labelWidth={labelWidth}
                        name={name}
                        id={name}
                        endAdornment={
                            onClear && (<IconButton onClick={onClear}>
                                <ClearIcon fontSize='small'/>
                            </IconButton>)
                        }
                    />
                }
            >
                {components.sort(Sort.alphabetically).map(component => {
                    return (
                        <MenuItem key={component.dn} value={component.basePath}>
                            {component.description}
                        </MenuItem>
                    );
                })}
            </Select>

        </FormControl>

    );

}


ComponentSelector.defaultProps = {
    disabled: false,
    required: true,
    onClear: null
};
ComponentSelector.propTypes = {
    classes: PropTypes.any,
    components: PropTypes.any.isRequired,
    handleChange: PropTypes.any.isRequired,
    name: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    disabled: PropTypes.bool.isRequired,
    required: PropTypes.bool.isRequired,
    onClear: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
};


