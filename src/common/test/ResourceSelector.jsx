import React, {useEffect, useRef, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from "@material-ui/core/IconButton";
import {Search} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));
export default function ResourceSelector(props) {

    const classes = useStyles();
    const {name, value, resources, disabled, required, error = false, onClear, component, searchLog} = props;

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
            <InputLabel ref={inputLabel} htmlFor={name}>Ressurs</InputLabel>
            <Select
                value={value}
                onChange={props.handleChange}
                input={
                    <OutlinedInput
                        labelWidth={labelWidth}
                        name={name}
                        id={name}
                        endAdornment={
                            <>
                                {value.length > 0 && (
                                    <IconButton
                                        aria-label="clear"
                                        onClick={onClear}
                                    >
                                        <ClearIcon fontSize='small'/>
                                    </IconButton>)
                                }
                            </>
                        }
                    />
                }
            >
                {resources.map(resource => {
                    if (resource.path === component){
                        return resource.classes.map(theClass => {
                            return (
                                <MenuItem key={theClass.path} value={theClass.name}>
                                    {theClass.name}
                                </MenuItem>
                            );
                        })

                    }

                })}
            </Select>

        </FormControl>

    );

}


ResourceSelector.defaultProps = {
    disabled: false,
    required: true,
    onClear: null
};
ResourceSelector.propTypes = {
    classes: PropTypes.any,
    resources: PropTypes.any.isRequired,
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


