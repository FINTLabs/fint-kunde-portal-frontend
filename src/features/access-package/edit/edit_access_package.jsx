import React, {useState} from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {Checkbox, Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import {useDispatch, useSelector} from "react-redux";
import {updateSelectedComponents} from "../../../data/redux/actions/access_package";
import Divider from "@material-ui/core/Divider";
import EntitySelection from "./entity_selection";

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
    const {open, handleClose, handleSaveAccess} = props;
    const classes = useStyles();
    const [componentSelectorOpen, setComponentSelectorOpen] = useState(false);
    const [selectedComponents, setSelectedComponents] = useState([]);
    const selectedForEditingId = useSelector(state => state.access_package.selectedForEditing);
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);

    let selectedAccessPackage = undefined;
    accessPackages.map(ap => {
        if (ap.dn === selectedForEditingId) {
            selectedAccessPackage = ap;
        }
        return ap;
    });

    console.log("selectedAccessPackage: ", selectedAccessPackage);

    function openComponentSelector() {
        setComponentSelectorOpen(true);
    }

    function handleCloseComponentSelector() {
        setComponentSelectorOpen(false);
    }

    function chooseComponent(event, component) {
        let test = {...selectedComponents};
        test[component.name] = event.target.checked;
        setSelectedComponents(test);
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
                        <Button autoFocus color="inherit" onClick={() => handleSaveAccess(selectedAccessPackage)}>
                            Lagre
                        </Button>
                    </Toolbar>
                </AppBar>
                <Fab
                    color="secondary"
                    className={classes.addButton}
                    onClick={openComponentSelector}
                >
                    <Add/>
                </Fab>
                <Divider></Divider>
                <EntitySelection
                    selectedAccessPackage={selectedAccessPackage}
                    selectedComponents={selectedComponents}
                />
                <Dialog
                    open={componentSelectorOpen}
                    onClose={handleCloseComponentSelector}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Legg til komponenter"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Velg komponenter du skal ha tilgang til
                        </DialogContentText>
                        <List component="nav" aria-label="Komponentlist" dense>
                            {componentConfiguration.map(componentConfig => {

                                return (
                                    <ListItem key={componentConfig.name}>
                                        <ListItemText primary={componentConfig.name}/>
                                        <Checkbox
                                            checked={selectedComponents[componentConfig.name] ? selectedComponents[componentConfig.name] : false}
                                            onChange={(e) => chooseComponent(e, componentConfig)}/>
                                    </ListItem>);
                            })}
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