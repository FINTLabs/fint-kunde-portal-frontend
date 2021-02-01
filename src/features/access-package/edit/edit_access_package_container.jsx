import React, {useState} from 'react';
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import {Fab} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import TemplateIcon from "@material-ui/icons/CloudDownload";
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
import TemplateContainerDialog from "./template/template_container_dialog";
import Box from "@material-ui/core/Box";
import ToolTipFab from "../../../common/fab/ToolTipFab";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    addButton: {
        margin: theme.spacing(1),
        top: theme.spacing(16),
        right: theme.spacing(3),
        position: "absolute"
    },
    templateButton: {
        margin: theme.spacing(1),
        top: theme.spacing(25),
        right: theme.spacing(3),
        position: "absolute"
    },
    listItem: {
        borderBottom: "1px dashed lightgray"
    },
    cancelTemplateButton: {
        inlineSize: "-webkit-fill-available",
    },
}));

const EditAccessPackageContainer = (props) => {
    const {
        open, handleClose, handleSaveAccess, setEditOpen, openSave, handleSaveClose,
        setSnackBarOpen, setSnackBarMessage
    } = props;
    const classes = useStyles();
    const [componentSelectorOpen, setComponentSelectorOpen] = useState(false);
    const [templateSelectorOpen, setTemplateSelectorOpen] = useState(false);
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

    function openTemplateSelector() {
        setTemplateSelectorOpen(true);
    }


    function handleCloseComponentSelector() {
        setComponentSelectorOpen(false);
    }

    function removePathsFromList(list, component) {
        return list.filter(path => {
            let keepPath = true;
            component.classes.forEach(aClass => {
                if (aClass.path === path) {
                    keepPath = false;
                }
            });
            return keepPath;
        });
    }

    function chooseComponent(component) {
        let newAccessPackages = [...accessPackages];
        let newAccessPackage = {...selectedAccessPackage};
        const accessPackageIndex = newAccessPackages.indexOf(newAccessPackages.filter(ap => ap.dn === newAccessPackage.dn)[0]);

        if (newAccessPackage.components.includes(component.dn)) {
            let componentIndex = newAccessPackage.components.indexOf(component.dn);
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

    function handleTemplateSelectorOpen() {
        setTemplateSelectorOpen(false);
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

                <AppBar position="static" color="transparent">

                    <Tabs value={tabValue} onChange={handleTabChange}
                          aria-label="simple tabs example" centered>
                        <Tab label="Velg tilganger"/>
                        <Tab label="Velg klienter"/>
                    </Tabs>
                </AppBar>
                {tabValue === 0 ?


                    <Box display={"flex"} flexDirection={"row"} m={1}>
                        <EntitySelection selectedAccessPackage={selectedAccessPackage}/>
                        <ToolTipFab color="secondary" onClick={openComponentSelector}
                                    toolTip="Legg til komponent" className={classes.addButton}
                        >
                            <Add/>
                        </ToolTipFab>

                        <ToolTipFab color="secondary" className={classes.templateButton}
                             onClick={openTemplateSelector} toolTip="Last regler fra mal"
                        >
                            <TemplateIcon/>
                        </ToolTipFab>

                    </Box>
                    : <ClientSelection selectedAccessPackage={selectedAccessPackage}/>}
                <EditAccessPackageDialog
                    componentSelectorOpen={componentSelectorOpen}
                    handleCloseComponentSelector={handleCloseComponentSelector}
                    componentConfiguration={componentConfiguration}
                    selectedAccessPackage={selectedAccessPackage}
                    chooseComponent={chooseComponent}/>
                <TemplateContainerDialog
                    templateSelectorOpen={templateSelectorOpen}
                    selectedAccessPackage={selectedAccessPackage}
                    handleTemplateSelectorOpen={handleTemplateSelectorOpen}/>

                <ConfirmAccessPackageUpdate
                    open={openSave} handleClose={handleSaveClose} setEditOpen={setEditOpen}
                    handleExit={handleClose}
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
                        <Button variant="contained"
                                onClick={() => {
                                    setOpenCloseDialog(false);
                                    setTabValue(0);
                                    handleClose();
                                }} color="primary" autoFocus>
                            Avslutt
                        </Button>
                        <Button variant="contained" onClick={closeCloseDialog} color="primary">
                            Fortsett redigering
                        </Button>
                    </DialogActions>
                </Dialog>
            </Dialog>
        </>
    );
};

export default EditAccessPackageContainer;
