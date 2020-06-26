import React from 'react';
import {
    Avatar,
    CircularProgress,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const ClientTabAccessPackageList = (props) => {
    const {client, classes, accessPackage, handleClientChange, disabled, selectedName} = props;

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
                                <CircularProgress className={classes.circularProgress}/> :
                                <Switch disabled={disabled} checked={accessPackage.clients.includes(client.dn)}
                                        name={client.name}
                                        onChange={(event) => handleClientChange(event, client, accessPackage, accessPackage.name)}
                                />}
                        label={accessPackage.clients.includes(client.dn) ? "Aktiv" : "Ikke aktivert"}
                    />
                </FormControl>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ClientTabAccessPackageList;