import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    Switch,
    FormControl,
    FormControlLabel
} from "@mui/material";
import ClientIcon from "@mui/icons-material/ImportantDevices";
import {updateAccessPackages} from "../../../data/redux/actions/access_package";
import FeatureHelperText from "../../../common/help/FeatureHelperText";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";

const PREFIX = 'ClientSelection';

const classes = {
    root: `${PREFIX}-root`,
    clientList: `${PREFIX}-clientList`,
    itemAvatar: `${PREFIX}-itemAvatar`,
    header: `${PREFIX}-header`,
    listItem: `${PREFIX}-listItem`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },

    [`& .${classes.clientList}`]: {
        maxWidth: 800,
        margin: "auto",
    },

    [`& .${classes.itemAvatar}`]: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.main
    },

    [`& .${classes.header}`]: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },

    [`& .${classes.listItem}`]: {
        borderBottom: "1px dashed lightgray",
        padding: theme.spacing(),
    }
}));

const ClientSelection = (props) => {

    const {selectedAccessPackage} = props;
    const clients = useSelector(state => state.client.clients);
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const [showWarning, setShowWarning] = useState(false);
    const [switchValue, setSwitchValue] = useState(false);
    const [switchClient, setSwitchClient] = useState(null);
    const warningMessageText = "Når du aktiverer en tilgangspakke på en klient, vil andre tilgangspakker som er koblet til denne klienten bli fjernet. Ønsker du å fortsette?";


    const dispatch = useDispatch();

    function clientChange(doChange) {
        if (doChange) {
            handleClientChange(switchValue, switchClient);
        }
        setShowWarning(false);
    }

    function handleClientChange(event, client) {
        let newClients = [...selectedAccessPackage.clients];
        let newAccessPackages = [...accessPackages];
        let newAccessPackage = {...selectedAccessPackage};
        const accessPackageIndex = newAccessPackages.indexOf(newAccessPackages.filter( ap => ap.dn === newAccessPackage.dn)[0]);

        if (newClients.includes(client.dn)) {
            let clientIndex = newClients.indexOf(client.dn);
            newClients.splice(clientIndex, 1);
        } else {
            newClients.push(client.dn);
        }
        newAccessPackage.clients = newClients;
        newAccessPackages[accessPackageIndex] = newAccessPackage;
        dispatch(updateAccessPackages(newAccessPackages));
    }

    return (
        <Root className={classes.root}>
            <List className={classes.clientList}>
                <Typography variant="h4" className={classes.header}> Knytte tilgangspakken til klient
                </Typography>
                <FeatureHelperText>
                    <p>En klient kan bare være knyttet til én tilgangspakke.
                        Dersom du knytter en klient, som allerede har en tilgangspakke, til en ny tilgangspakke,
                        fjernes den gamle tilgangspakken fra klienten.</p>
                </FeatureHelperText>
                {clients.map(client => {
                    return (
                        <ListItem className={classes.listItem} key={client.dn}>
                            <ListItemAvatar>
                                <Avatar className={classes.itemAvatar}>
                                    <ClientIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                {client.name}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <FormControl>
                                    <FormControlLabel
                                        control={<Switch checked={selectedAccessPackage.clients.includes(client.dn)}
                                                         onChange={(event) => {
                                                             if (event.target.checked) {
                                                                 setSwitchValue(event.target.checked);
                                                                 setSwitchClient(client);
                                                                 setShowWarning(true);
                                                             } else {
                                                                 handleClientChange(event, client);
                                                             }
                                                         }}
                                                         name={client.name}/>}
                                        label={selectedAccessPackage.clients.includes(client.dn) ? "Tilknyttet" : "Ikke tilknyttet"}
                                    />
                                </FormControl>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
            <WarningMessageBox
                onClose={clientChange}
                message={warningMessageText}
                show={showWarning}
                title={"Koble til klient"}/>

        </Root>
    );
};

export default ClientSelection;
