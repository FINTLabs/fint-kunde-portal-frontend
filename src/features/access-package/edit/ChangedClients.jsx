import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, ListItem, ListItemText, List,ListItemIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import RemoveIcon from "@mui/icons-material/RemoveCircleRounded";

const PREFIX = 'ChangedClients';

const classes = {
    addingText: `${PREFIX}-addingText`,
    removingText: `${PREFIX}-removingText`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.addingText}`]: {
        color: "green",
    },

    [`& .${classes.removingText}`]: {
        color: "red",
    }
}));

const ChangedClients = (props) => {
    const {oldAccessPackage, newAccessPackage} = props;

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
        <Root>
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
        </Root>
    );
};

export default ChangedClients;