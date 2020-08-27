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

    function addDissimilarityToList(array, array2, list) {
        array.forEach(entry => {
            if (!array2.includes(entry)) {
                const text = "+ " + entry;
                list.push(text);
            }
        });
        array2.forEach(entry => {
            if (!array.includes(entry)){
                const text = "- " + entry;
                list.push(text);
            }
        })
    }

    function getEntity(entity){
        componentConfiguration.forEach(componentConfiguration => {
            componentConfiguration.classes.forEach(aClass => {
                if (aClass.path === entity){
                    entity = componentConfiguration.displayName + " " + aClass.name;
                }
            });
        });
        return entity;
    }

    function accessListItem(entry) {
        const removingEntry = entry.charAt(0) === "-";
        let entity = entry.substring(2, entry.length);
        entity = getEntity(entity);
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

    addDissimilarityToList(newAccessPackage.collection, oldAccessPackage.collection, collectionList);
    addDissimilarityToList(newAccessPackage.read, oldAccessPackage.read, readList);
    addDissimilarityToList(newAccessPackage.modify, oldAccessPackage.modify, modifyList);

    return (
        <div>
            <List dense>
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