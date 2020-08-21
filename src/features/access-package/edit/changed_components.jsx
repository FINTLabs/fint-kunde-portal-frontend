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

const ChangedComponents = (props) => {
    const classes = useStyles();
    const {oldAccessPackage, newAccessPackage} = props;
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);
    const componentList = [];

    function accessListItem(entry) {
        const removingEntry = entry.charAt(0) === "-";
        let entity = entry.substring(2, entry.length);
        componentConfiguration.map(componentConfiguration => {
                if (componentConfiguration.dn === entity){
                    entity = componentConfiguration.displayName;
                }
                return null;
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
                {newAccessPackage.components.forEach(entry => {
                    if (!oldAccessPackage.components.includes(entry)) {
                        const text = "+ " + entry;
                        componentList.push(text);
                    }
                })}
                {oldAccessPackage.components.forEach(entry => {
                    if (!newAccessPackage.components.includes(entry)) {
                        const text = "- " + entry;
                        componentList.push(text);
                    }
                })}
                {componentList.length > 0 ? <Typography>Komponenter</Typography> : null}
                {componentList.map(entry => {
                    return accessListItem(entry);
                })}
            </List>
        </div>
    );
};

export default ChangedComponents;