import React from "react";
import { styled } from "@mui/material/styles";
import { List, ListItem, ListItemText, Typography, ListItemIcon } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleRounded";
import RemoveIcon from "@mui/icons-material/RemoveCircleRounded";
import {useSelector} from "react-redux";


const PREFIX = 'ChangedComponents';

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

const ChangedComponents = (props) => {

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
        <Root>
            <List dense>
                {componentList.length > 0 ? <Typography>Komponenter</Typography> : null}
                {componentList.map(entry => {
                    return accessListItem(entry);
                })}
            </List>
        </Root>
    );
};

export default ChangedComponents;