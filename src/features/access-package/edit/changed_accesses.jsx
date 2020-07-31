import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/AddCircleRounded";
import RemoveIcon from "@material-ui/icons/RemoveCircleRounded";
import {useSelector} from "react-redux";


const useStyles = makeStyles(theme => ({
    addingText: {
        color: "green",
    },
    removingText: {
        color: "red",
    }
}));

const ChangedAccesses = (props) => {
    const classes = useStyles();
    const {oldAccessPackage, newAccessPackage} = props;
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);
    const collectionList = [];
    const readList = [];
    const modifyList = [];

    function accessListItem(entry) {
        const removingEntry = entry.charAt(0) === "-";
        let entity = entry.substring(2, entry.length);
        componentConfiguration.map(componentConfiguration => {
            componentConfiguration.classes.map(aClass => {
                if (aClass.path === entity){
                    entity = componentConfiguration.displayName + " " + aClass.name;
                }
            })
        });
        return (
            <ListItem key={entry}>
                <ListItemIcon>
                    {removingEntry ? <RemoveIcon className={classes.removingText}/> :
                        <AddIcon className={classes.addingText}/>}
                </ListItemIcon>
                <ListItemText
                    primary={entity}
                />
            </ListItem>
        );
    }

    return (
        <div>
            <List dense>
                {newAccessPackage.collection.forEach(entry => {
                    if (!oldAccessPackage.collection.includes(entry)) {
                        const text = "+ " + entry;
                        collectionList.push(text);
                    }
                })}
                {oldAccessPackage.collection.forEach(entry => {
                    if (!newAccessPackage.collection.includes(entry)) {
                        const text = "- " + entry;
                        collectionList.push(text);
                    }
                })}
                {newAccessPackage.read.forEach(entry => {
                    if (!oldAccessPackage.read.includes(entry)) {
                        const text = "+ " + entry;
                        readList.push(text);
                    }
                })}
                {oldAccessPackage.read.forEach(entry => {
                    if (!newAccessPackage.read.includes(entry)) {
                        const text = "- " + entry;
                        readList.push(text);
                    }
                })}
                {newAccessPackage.modify.forEach(entry => {
                    if (!oldAccessPackage.modify.includes(entry)) {
                        const text = "+ " + entry;
                        modifyList.push(text);
                    }
                })}
                {oldAccessPackage.modify.forEach(entry => {
                    if (!newAccessPackage.modify.includes(entry)) {
                        const text = "- " + entry;
                        modifyList.push(text);
                    }
                })}
                {collectionList.length > 0 ? <Typography>Bulk</Typography> : null}
                {collectionList.map(entry => {
                    return accessListItem(entry);
                })}
                {readList.length > 0 ? <Typography>Single</Typography> : null}
                {readList.map(entry => {
                    return accessListItem(entry);

                })}
                {modifyList.length > 0 ? <Typography>Endre</Typography> : null}
                {modifyList.map(entry => {
                    return accessListItem(entry);
                })}
            </List>
        </div>
    );
};

export default ChangedAccesses;