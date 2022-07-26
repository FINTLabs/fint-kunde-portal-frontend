import React, {useEffect, useRef, useState} from "react";
import { styled } from '@mui/material/styles';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, IconButton } from '@mui/material';
import PropTypes from "prop-types";
import ClearIcon from '@mui/icons-material/Clear';


const PREFIX = 'ResourceSelector';

const classes = {
    formControl: `${PREFIX}-formControl`,
    menuItem: `${PREFIX}-menuItem`
};

const StyledFormControl = styled(FormControl)((
    {
        theme
    }
) => ({
    [`&.${classes.formControl}`]: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

    [`& .${classes.menuItem}`]: {
        textTransform: "capitalize",
    }
}));

export default function ResourceSelector(props) {


    const {name, value, resources, disabled, required, error = false, onClear, component} = props;

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
            <InputLabel ref={inputLabel} htmlFor={name}>Ressurs</InputLabel>
            <Select
                value={value}
                onChange={props.handleChange}
                className={classes.menuItem}
                input={
                    <OutlinedInput
                        label={"Ressurs"}
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
                    if (resource.path === component) {
                        return resource.classes.map(theClass => {
                            return (
                                <MenuItem key={theClass.path} value={theClass.name} className={classes.menuItem}
                                >
                                    {theClass.name}
                                </MenuItem>
                            );
                        })

                    }return null

                })}
            </Select>

        </StyledFormControl>
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


