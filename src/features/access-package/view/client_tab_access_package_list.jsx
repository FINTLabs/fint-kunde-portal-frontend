import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const ClientTabAccessPackageList = (props) => {
    const {client, classes, accessPackage, handleClientChange, disabled} = props;

    const checkBoxes =
        <FormControl>
            <FormControlLabel
                control={<Switch disabled={disabled} checked={accessPackage.clients.includes(client.dn)}
                                 onChange={(event) => handleClientChange(event, client, accessPackage)}
                                 name={client.name}/>}
                label="Aktivert klient"
            />
        </FormControl>;


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
                {checkBoxes}
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default ClientTabAccessPackageList;