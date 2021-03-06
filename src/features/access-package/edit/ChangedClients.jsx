import React from 'react';
import {Typography} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/AddCircleRounded";
import RemoveIcon from "@material-ui/icons/RemoveCircleRounded";

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

    function addDissimilarityToList(array, array2, list) {
        array.forEach(entry => {
            if (!array2.includes(entry)) {
                const text = "+ " + entry.split(",")[0].replace("cn=", "");
                list.push(text);
            }
        });
        array2.forEach(entry => {
            if (!array.includes(entry)){
                const text = "- " + entry.split(",")[0].replace("cn=", "");
                list.push(text);
            }
        })
    }

    addDissimilarityToList(newAccessPackage.clients, oldAccessPackage.clients, clientList);


    return (
        <div>
            <List dense>
                {clientList.length > 0 ? <Typography>Klienter</Typography> : null}
                {clientList.map(entry => {
                    const removingEntry = entry.charAt(0) === "-";
                    return (
                        <ListItem key={entry}>
                            <ListItemIcon>
                                {removingEntry ? <RemoveIcon className={classes.removingText}/> :
                                    <AddIcon className={classes.addingText}/>}
                            </ListItemIcon>
                            <ListItemText
                                primary={entry.substring(1, entry.length)}
                            />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );
};

export default ChangedClients;