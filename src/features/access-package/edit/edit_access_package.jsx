import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import CloseIcon from '@material-ui/icons/Close';
import Slide from "@material-ui/core/Slide";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const EditAccessPackage = (props) => {
    const {open, handleClose} = props;
    const classes = useStyles();
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
};

export default EditAccessPackage;