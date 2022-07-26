import React, {useEffect, useRef, useState} from "react";
import { styled } from '@mui/material/styles';
import { FormControl, InputLabel,Select, MenuItem, OutlinedInput } from '@mui/material';
import PropTypes from "prop-types";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import Sort from '../../common/utils/Sort';

const PREFIX = 'ComponentSelector';

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

export default function ComponentSelector(props) {


    const {name, value, components, disabled, required, error = false, onClear} = props;

    const inputLabel = useRef();
    const [labelwidth, setLabelwidth] = useState(0);
    useEffect(() => {
        setLabelwidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <StyledFormControl
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
                        label={"Komponent"}
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

        </StyledFormControl>
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


