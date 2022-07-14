import React from 'react';
import { Typography, ListItem, ListItemText, List } from '@mui/material';
import {makeStyles} from "@mui/styles";
import { ListItemIcon} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import RemoveIcon from "@mui/icons-material/RemoveCircleRounded";

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