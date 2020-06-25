import React from 'react';
import {Typography} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    addingText: {
        color: "green",
    },
    removingText: {
        color: "red",
    }
}));

const ChangedClients = (props) => {
    const {oldAccessPackage, newAccessPackage} = props;
    const classes = useStyles();
    const clientList = [];
    return (
        <div>
            <List dense>
                <Typography>Klienter</Typography>
                {newAccessPackage.clients.forEach(entry => {
                    if (!oldAccessPackage.clients.includes(entry)) {
                        const text = "+ " + entry.split(",")[0].replace("cn=","");
                        clientList.push(text);
                    }
                })}
                {oldAccessPackage.clients.forEach(entry => {
                    if (!newAccessPackage.clients.includes(entry)) {
                        const text = "- " + entry.split(",")[0].replace("cn=","");
                        clientList.push(text);
                    }
                })}

                {clientList.map(entry => {
                    return (
                        <ListItem>
                            <ListItemText
                                className={entry.charAt(0) === "-" ? classes.removingText: classes.addingText}
                                primary={entry}
                            />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
};

export default ChangedClients;