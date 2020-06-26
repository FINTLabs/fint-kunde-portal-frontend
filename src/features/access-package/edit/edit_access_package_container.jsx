import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import Divider from "@material-ui/core/Divider";
import EntitySelection from "./entity_selection";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {updateAccessPackages} from "../../../data/redux/actions/access_package";
import ClientSelection from "./client_selection";
import EditAccessPackageAppBar from "./edit_access_package_app_bar";
import EditAccessPackageDialog from "./edit_access_package_dialog";
import ConfirmAccessPackageUpdate from "./confirm_access_package_update";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

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
        top: 150,
        left: "auto",
        bottom: "auto",
        right: 50,
        position: "absolute"
    }
}));

const EditAccessPackageContainer = (props) => {
    const {
        open, handleClose, handleSaveAccess, setEditOpen, openSave, handleSaveClose,
        setSnackBarOpen, setSnackBarMessage
    } = props;
    const classes = useStyles();
    const [componentSelectorOpen, setComponentSelectorOpen] = useState(false);
    const [openCloseDialog, setOpenCloseDialog] = useState(false);
    const selectedForEditingId = useSelector(state => state.access_package.selectedForEditing);
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);
    const [tabValue, setTabValue] = useState(0);
    const dispatch = useDispatch();

    let selectedAccessPackage = undefined;
    accessPackages.map(ap => {
        if (ap.dn === selectedForEditingId) {
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

    function findIndex(array, value) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].dn === value.dn) {
                return i;
            }
        }
        return -1;
    }

    function findComponentIndex(array, value) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i] === value) {
                return i;
            }
        }
        return -1;
    }

    function removePathsFromList(list, component) {
        return list.filter(path => {
            let keepPath = true;
            component.classes.map(aClass => {
                if (aClass.path === path) {
                    keepPath = false;
                }
                return null;
            });
            return keepPath;
        });
    }

    function chooseComponent(component) {
        let newAccessPackages = [...accessPackages];
        let newAccessPackage = {...selectedAccessPackage};
        const accessPackageIndex = findIndex(newAccessPackages, newAccessPackage);

        if (newAccessPackage.components.includes(component.dn)) {
            let componentIndex = findComponentIndex(newAccessPackage.components, component.dn);
            newAccessPackage.components.splice(componentIndex, 1);
            newAccessPackage.collection = removePathsFromList(newAccessPackage.collection, component);
            newAccessPackage.read = removePathsFromList(newAccessPackage.read, component);
            newAccessPackage.modify = removePathsFromList(newAccessPackage.modify, component);
        } else {
            newAccessPackage.components.push(component.dn);
        }
        newAccessPackages[accessPackageIndex] = newAccessPackage;
        dispatch(updateAccessPackages(newAccessPackages));
    }

    function handleTabChange(event, newValue) {
        setTabValue(newValue);
    }

    function closeCloseDialog() {
        setOpenCloseDialog(false);
    }

    return (
        <>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <EditAccessPackageAppBar
                    classes={classes}
                    handleClose={setOpenCloseDialog}
                    handleSaveAccess={handleSaveAccess}
                    selectedAccessPackage={selectedAccessPackage}/>
                <Divider/>

                <AppBar position="static">

                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example" centered>
                        <Tab label="Velg tilganger"/>
                        <Tab label="Velg klienter"/>
                    </Tabs>
                </AppBar>
                {tabValue === 0 ?
                    <>
                        <EntitySelection selectedAccessPackage={selectedAccessPackage}/>
                        <Fab color="secondary" className={classes.addButton} onClick={openComponentSelector}
                             variant="extended">
                            <Add/>
                            Legg til
                        </Fab>
                    </>
                    : <ClientSelection selectedAccessPackage={selectedAccessPackage}/>}
                <EditAccessPackageDialog
                    componentSelectorOpen={componentSelectorOpen}
                    handleCloseComponentSelector={handleCloseComponentSelector}
                    componentConfiguration={componentConfiguration}
                    selectedAccessPackage={selectedAccessPackage}
                    chooseComponent={chooseComponent}/>
                <ConfirmAccessPackageUpdate
                    open={openSave} handleClose={handleSaveClose} setEditOpen={setEditOpen}
                    setSnackBarOpen={setSnackBarOpen} setSnackBarMessage={setSnackBarMessage}/>
                <Dialog
                    open={openCloseDialog}
                    onClose={closeCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title">{"Avslutte redigering. Ingen endringer blir lagret."}</DialogTitle>
                    <DialogActions>
                        <Button onClick={closeCloseDialog} color="primary">
                            Fortsett redigering
                        </Button>
                        <Button onClick={() => {
                            setOpenCloseDialog(false);
                            setTabValue(0);
                            handleClose();
                        }} color="primary" autoFocus>
                            Avslutt
                        </Button>
                    </DialogActions>
                </Dialog>
            </Dialog>
        </>
    );
};

export default EditAccessPackageContainer;