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
import EntitySelection from "./entity_selection";
import Divider from "@material-ui/core/Divider";

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
    const [componentSelectorOpen, setComponentSelectorOpen] = useState(false);
    const selectedForEditingId = useSelector(state => state.access_package.selectedForEditing);
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const entities = useSelector(state => state.entity.entities);
    const dispatch = useDispatch();

    let selectedAccessPackage = undefined;
    accessPackages.map(ap => {
        if (ap.id === selectedForEditingId) {
            selectedAccessPackage = ap;
        }
        return ap;
    });

    function openComponentSelector() {
        setComponentSelectorOpen(true);
    }

    function handleCloseComponentSelector() {
        setComponentSelectorOpen(false);
    }

    function chooseComponent(event, component) {
        const newArray = [...accessPackages];
        let accessPackageFound = newArray.find(function (entry) {
            return entry.id === selectedForEditingId;
        });
        if (accessPackageFound) {
            const accessPackageIndex = newArray.indexOf(accessPackageFound);
            let componentFound = newArray[accessPackageIndex].selectedComponents.find(function (comp) {
                return comp.dn === component.dn;
            });
            if (componentFound) {
                const componentIndex = newArray[accessPackageIndex].selectedComponents.indexOf(componentFound);
                newArray[accessPackageIndex].selectedComponents[componentIndex].checked = event.target.checked;
            } else {
                newArray[accessPackageIndex].selectedComponents.push({...component , checked: event.target.checked});
            }
        } else {
            return;
        }

        dispatch(updateSelectedComponents(newArray));
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
                            {entities.map(entity => {
                                if (!entity.openData && !entity.common) {
                                    if (selectedAccessPackage) {
                                        const selectedComponent = selectedAccessPackage.selectedComponents.filter(function (sc) {
                                            return sc.dn === entity.dn;
                                        });
                                        return (
                                            <ListItem key={entity.dn}>
                                                <ListItemText primary={entity.description}/>
                                                <Checkbox
                                                    checked={selectedComponent[0] ? selectedComponent[0].checked : false}
                                                    onChange={(e) => chooseComponent(e, entity)}/>
                                            </ListItem>)
                                    }
                                }
                                return null;
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