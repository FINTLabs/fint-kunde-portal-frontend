import React from "react";
import PropTypes from "prop-types";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    OutlinedInput
} from '@mui/material';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    clientWarning: {
        color: theme.palette.primary.main
    }
}));

export default function ClientSelector(props) {
    const classes = useStyles();
    const {name, value, clients, disabled} = props;
    let selectableClients = clients.filter(c => c.assetId !== null);

    const inputLabel = React.useRef();
    const [labelwidth, setLabelwidth] = React.useState(0);
    React.useEffect(() => {
        setLabelwidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <div>
            <FormControl
                className={classes.formControl}
                fullWidth
                disabled={disabled}
                variant="outlined"
            >
                <InputLabel ref={inputLabel} htmlFor={name}>Klient</InputLabel>
                <Select
                    id={"clientSelector"}
                    value={value}
                    onChange={props.handleChange}
                    input={<OutlinedInput labelwidth={labelwidth} name={name} id={name}/>}
                >
                    {selectableClients.map(client => {
                        return (
                            <MenuItem key={client.name} value={client.name}>
                                {client.shortDescription}
                            </MenuItem>
                        );
                    })}
                </Select>
                <FormHelperText className={classes.clientWarning}>
                    Bruk en egen klient for testing. Passordet blir regenerert hver gang
                    du kjører en test.
                </FormHelperText>
            </FormControl>
        </div>
    );
}

ClientSelector.propTypes = {
    classes: PropTypes.object,
    clients: PropTypes.any.isRequired,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};