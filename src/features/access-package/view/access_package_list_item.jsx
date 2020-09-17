import React from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";

const AccessPackageListItem = (props) => {
    const {classes, accessPackage, openEdit, openDeleteAccessPackageDialog} = props;
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
                <IconButton
                    aria-label="Edit"
                    onClick={() => openEdit(accessPackage.dn, accessPackage)}
                >
                    <Edit/>
                </IconButton>
                <IconButton
                    aria-label="Delete"
                    onClick={() => openDeleteAccessPackageDialog(accessPackage)}
                >
                    <Delete/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default AccessPackageListItem;