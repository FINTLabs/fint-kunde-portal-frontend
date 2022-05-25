import React, {useEffect, useRef, useState} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {makeStyles,} from "@material-ui/core";
import PropTypes from "prop-types";

import {personopplysning} from './data'
const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

const types = personopplysning;

export default function ConsentTypeSelector(props) {

    const classes = useStyles();

    const inputLabel = useRef();
    const [setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel ref={inputLabel} htmlFor={name}>Consent Type</InputLabel>
            <Select
                native
                id={"componentSelector"}
                // value={value}
                onChange={props.handleChange}
            >
                {types.map(x => {
                    return (
                        <option value={x.name} key={x.id}>
                            {x.code}: {x.name}
                        </option>
                    );
                })}
            </Select>
        </FormControl>

    );

}


ConsentTypeSelector.defaultProps = {
    disabled: false,
    required: true,
    onClear: null
};
ConsentTypeSelector.propTypes = {
    classes: PropTypes.any,
    components: PropTypes.any.isRequired,
    handleChange: PropTypes.any.isRequired,
    name: PropTypes.any.isRequired,
    value: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    required: PropTypes.bool.isRequired,
    onClear: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
};
