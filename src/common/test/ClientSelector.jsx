import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    OutlinedInput
} from '@mui/material';
const PREFIX = 'ClientSelector';

const classes = {
    formControl: `${PREFIX}-formControl`,
    clientWarning: `${PREFIX}-clientWarning`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.formControl}`]: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

    [`& .${classes.clientWarning}`]: {
        color: theme.palette.primary.main
    }
}));

export default function ClientSelector(props) {

    const {name, value, clients, disabled} = props;
    let selectableClients = clients.filter(c => c.assetId !== null);

    const inputLabel = React.useRef();
    const [labelwidth, setLabelwidth] = React.useState(0);
    React.useEffect(() => {
        setLabelwidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <Root>
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
        </Root>
    );
}

ClientSelector.propTypes = {
    classes: PropTypes.object,
    clients: PropTypes.any.isRequired,
    handleChange: PropTypes.func.isRequired,
    name: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};