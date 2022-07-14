import React from 'react';
import { List, ListItem, ListItemText, Typography, ListItemIcon } from '@mui/material';
import {makeStyles} from "@mui/styles";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import RemoveIcon from "@mui/icons-material/RemoveCircleRounded";
import {useSelector} from "react-redux";


const useStyles = makeStyles(theme => ({
    addingText: {
        color: "green",
    },
    removingText: {
        color: "red",
    }
}));

const ChangedComponents = (props) => {
    const classes = useStyles();
    const {oldAccessPackage, newAccessPackage} = props;
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);
    const componentList = [];

    function getEntity(entity){
        componentConfiguration.forEach(componentConfiguration => {
            if (componentConfiguration.dn === entity) {
                entity = componentConfiguration.displayName;
            }
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

    addDissimilarityToList(newAccessPackage.components, oldAccessPackage.components, componentList);

    return (
        <div>
            <List dense>
                {componentList.length > 0 ? <Typography>Komponenter</Typography> : null}
                {componentList.map(entry => {
                    return accessListItem(entry);
                })}
            </List>
        </div>
    );
};

export default ChangedComponents;