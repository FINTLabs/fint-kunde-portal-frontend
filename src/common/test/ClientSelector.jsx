import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";

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
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
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
                    value={value}
                    onChange={props.handleChange}
                    input={<OutlinedInput labelWidth={labelWidth} name={name} id={name}/>}
                >
                    {selectableClients.map(client => {
                        return (
                            <MenuItem key={client.dn} value={client.dn}>
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