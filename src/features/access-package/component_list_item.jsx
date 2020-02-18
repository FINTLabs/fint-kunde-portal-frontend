import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CollectionIcon from "@material-ui/icons/HorizontalSplit";
import ModifyIcon from "@material-ui/icons/Edit";
import {Checkbox, makeStyles} from "@material-ui/core";

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
}));

const ComponentListItem = (props) => {
    const {primary, secondary} = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });
    const handleChange = name => event => {
        setState({...state, [name]: event.target.checked});
    };
    return (
        <div>
            <ListItem>
                <ListItemText className={classes.listItemText} primary={primary} secondary={secondary}/>
                <Switch
                    checked={state.checkedA}
                    onChange={handleChange('checkedA')}
                    value="checkedA"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />
            </ListItem>
            <Collapse in={state.checkedA} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
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
                        <ListItemText primary="Modify"/>
                        <Checkbox/>
                    </ListItem>
                </List>
            </Collapse>
        </div>
    );
};

export default ComponentListItem;