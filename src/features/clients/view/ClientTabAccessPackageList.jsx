import React from 'react';
import {
    Avatar,
    CircularProgress,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText, makeStyles
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";

const useStyles = makeStyles((theme) => ({
    listItem: {
        borderBottom: "1px dashed lightgray",
        padding: theme.spacing(),
    },
    itemAvatar: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.main
    },
    circularProgress: {
        marginRight: theme.spacing(1),
    },
}));
const ClientTabAccessPackageList = (props) => {
    const {
        client, accessPackage, handleClientChange, disabled, selectedName, setAccessPackageToSwitch,
        showWarning, setShowWarning, handleClientChanging, setSwitchValue
    } = props;
    const classes = useStyles();
    const warningMessageText = "Når du aktiverer en tilgangspakke på en klient, vil andre tilgangspakker som er koblet til denne klienten bli fjernet. Ønsker du å fortsette?";


    return (
        <ListItem className={classes.listItem} key={accessPackage.dn}>
            <ListItemAvatar>
                <Avatar className={classes.itemAvatar}>
                    <LockIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={accessPackage.name}
                secondary={accessPackage.description}
            />
            <ListItemSecondaryAction>
                <FormControl>

                    <FormControlLabel
                        control={
                            accessPackage.name === selectedName ?
                                <CircularProgress color="secondary" className={classes.circularProgress}/> :
                                <Switch disabled={disabled} checked={accessPackage.clients.includes(client.dn)}
                                        name={client.name}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSwitchValue(event.target.checked);
                                                setAccessPackageToSwitch(accessPackage);
                                                setShowWarning(true);
                                            } else {
                                                handleClientChanging(accessPackage, event.target.checked);
                                            }
                                        }
                                        }
                                />}
                        label={accessPackage.clients.includes(client.dn) ? "Tilknyttet" : "Ikke tilknyttet"}
                    />
                </FormControl>
                <WarningMessageBox
                    show={showWarning}
                    onClose={handleClientChange}
                    message={warningMessageText}
                    title={"Koble til klient"}/>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ClientTabAccessPackageList;
