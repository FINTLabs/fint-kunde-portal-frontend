import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CollectionIcon from "@material-ui/icons/HorizontalSplit";
import ModifyIcon from "@material-ui/icons/Edit";
import ReadIcon from "@material-ui/icons/ChromeReaderMode";
import {Checkbox, makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        color:"black",
    },
    listItemText: {
        color: "black",
    },
    deleteButton:{
        backgroundColor: theme.palette.primary.main,
    }
}));

const ComponentListItem = (props) => {
    const {primary, secondary, onClick} = props;
    const classes = useStyles();

    return (
        <div>
            <ListItem>
                <ListItemText className={classes.listItemText} primary={primary} secondary={secondary}/>
                <Button className={classes.deleteButton} size="small" onClick={() => onClick(primary)}>Ta bort</Button>
            </ListItem>
                <List component="div" disablePadding dense={true}>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                           <ReadIcon></ReadIcon>
                        </ListItemIcon>
                        <ListItemText primary="Lese"/>
                        <Checkbox/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <CollectionIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bulk"/>
                        <Checkbox/>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <ModifyIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Oppdatering"/>
                        <Checkbox/>
                    </ListItem>
                </List>
        </div>
    );
};

export default ComponentListItem;