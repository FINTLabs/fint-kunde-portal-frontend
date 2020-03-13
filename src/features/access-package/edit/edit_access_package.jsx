import React, {useState} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Checkbox, Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import {fetchComponents} from "../../../data/redux/dispatchers/component";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(3),
        minWidth: 120,
        maxWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    addButton: {
        margin: 0,
        top: 100,
        left: "auto",
        bottom: "auto",
        right: 50,
        position: "fixed"
    }
}));

const EditAccessPackage = (props) => {
    const {open, handleClose} = props;
    const classes = useStyles();
    const [environment, setEnvironment] = useState(0);
    const [componentSelectorOpen, setComponentSelectorOpen] = useState(false);
    const components = useSelector(state => state.component);
    console.log(components.components);

    function openComponentSelector(){
        setComponentSelectorOpen(true);
    }
    function handleChangeEnvironment(event) {
        setEnvironment(event.target.value);
    }

    function handleCloseComponentSelector() {
        setComponentSelectorOpen(false);
    }

    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Legg til tilganger
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            Lagre
                        </Button>
                    </Toolbar>
                </AppBar>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Miljø</InputLabel>
                    <Select
                        native
                        value={environment}
                        onChange={handleChangeEnvironment}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-simple',
                        }}
                    >
                        <option value={0}>Velg miljø</option>
                        <option value={1}>Alfa</option>
                        <option value={2}>Beta</option>
                        <option value={3}>Produksjon</option>
                    </Select>
                </FormControl>
                <Fab
                    color="secondary"
                    className={classes.addButton}
                    onClick={openComponentSelector}
                >
                    <Add/>
                </Fab>
                <Dialog
                    open={componentSelectorOpen}
                    onClose={handleCloseComponentSelector}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Legg til komponent"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Velg en komponent til tilgangspakken
                        </DialogContentText>
                        <List component="nav" aria-label="secondary mailbox folders">
                            {components.components ? components.components.map(component => {
                                return (
                                    <ListItem>
                                        <ListItemText primary={component.description} />
                                        <Checkbox/>
                                    </ListItem>
                                )
                            }): <div/>}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseComponentSelector} color="primary">
                            Ferdig
                        </Button>
                    </DialogActions>
                </Dialog>
            </Dialog>
        </div>
    );
};

export default EditAccessPackage;