import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import ClientIcon from "@material-ui/icons/ImportantDevices";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import {updateAccessPackages} from "../../../data/redux/actions/access_package";
import FeatureHelperText from "../../../common/help/FeatureHelperText";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    clientList: {
        maxWidth: 800,
        margin: "auto",
    },
    itemAvatar: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.main
    },
    header: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
}));

const ClientSelection = (props) => {
    const classes = useStyles();
    const {selectedAccessPackage} = props;
    const clients = useSelector(state => state.client.clients);
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const [showWarning, setShowWarning] = useState(false);
    const [switchEvent, setSwitchEvent] = useState("");
    const [switchClient, setSwitchClient] = useState(null);
    
    const warningMessageText = switchClient != null ? "Klienten " + switchClient.name + " er allerede knyttet til pakken "
        + switchClient.accessPackages[0].split("ou=")[1].split(",")[0] + ". \n Ønsker du å endre aksesspakke på klienten?": "";

    const dispatch = useDispatch();

    function findIndex(array, value) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].dn === value.dn) {
                return i;
            }
        }
        return -1;
    }

    function clientChange(doChange) {
        if (doChange) {
            handleClientChange(switchEvent, switchClient);
        }
        setShowWarning(false);
    }

    function handleClientChange(event, client) {
        let newClients = [...selectedAccessPackage.clients];
        let newAccessPackages = [...accessPackages];
        let newAccessPackage = {...selectedAccessPackage};
        const accessPackageIndex = findIndex(newAccessPackages, newAccessPackage);
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
        <div className={classes.root}>
            <List className={classes.clientList}>
                <Typography variant="h4" className={classes.header}> Knytte aksesspakken til klient
                </Typography>
                <FeatureHelperText>
                    <p>En klient kan bare være knyttet til én aksesspakke.
                        Dersom du knytter en klient, som allerede har en aksesspakke, til en ny aksesspakke,
                        fjernes den gamle aksesspakken fra klienten.</p>
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
                                                             console.log("Client: ", switchClient);
                                                             if (!selectedAccessPackage.clients.includes(client.dn) && client.accessPackages.length > 0) {
                                                                 setShowWarning(true);
                                                                 setSwitchEvent(event);
                                                                 setSwitchClient(client);
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
                title={"Klient allerede knyttet til en annen aksesspakke"}/>

        </div>
    );
};

export default ClientSelection;