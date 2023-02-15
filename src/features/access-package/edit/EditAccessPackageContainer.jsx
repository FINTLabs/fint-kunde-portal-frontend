import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Add from "@mui/icons-material/Add";
import TemplateIcon from "@mui/icons-material/CloudDownload";
import {useDispatch, useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import EntitySelection from "./EntitySelection";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {updateAccessPackages} from "../../../data/redux/actions/access_package";
import ClientSelection from "./ClientSelection";
import EditAccessPackageAppBar from "./EditAccessPackageAppBar";
import EditAccessPackageDialog from "./EditAccessPackageDialog";
import ConfirmAccessPackageUpdate from "./ConfirmAccessPackageUpdate";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TemplateContainerDialog from "./TemplateContainerDialog";
import Box from "@mui/material/Box";
import ToolTipFab from "../../../common/fab/ToolTipFab";

const PREFIX = 'EditAccessPackageContainer';

const classes = {
    appBar: `${PREFIX}-appBar`,
    title: `${PREFIX}-title`,
    addButton: `${PREFIX}-addButton`,
    templateButton: `${PREFIX}-templateButton`,
    listItem: `${PREFIX}-listItem`,
    cancelTemplateButton: `${PREFIX}-cancelTemplateButton`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.appBar}`]: {
        position: 'relative',
    },

    [`& .${classes.title}`]: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },

    [`& .${classes.addButton}`]: {
        margin: theme.spacing(1),
        top: theme.spacing(16),
        right: theme.spacing(3),
        position: "absolute"
    },

    [`& .${classes.templateButton}`]: {
        margin: theme.spacing(1),
        top: theme.spacing(25),
        right: theme.spacing(3),
        position: "absolute"
    },

    [`& .${classes.listItem}`]: {
        borderBottom: "1px dashed lightgray"
    },

    [`& .${classes.cancelTemplateButton}`]: {
        inlineSize: "-webkit-fill-available",
    }
}));

const EditAccessPackageContainer = (props) => {
    const {
        open, handleClose, handleSaveAccess, setEditOpen, openSave, handleSaveClose,
        setSnackBarOpen, setSnackBarMessage
    } = props;

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
        (<Root>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <EditAccessPackageAppBar
                    classes={classes}
                    handleClose={setOpenCloseDialog}
                    handleSaveAccess={handleSaveAccess}
                    selectedAccessPackage={selectedAccessPackage}/>
                <Divider/>

                <AppBar position="static" color="inherit">

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
        </Root>)
    );
};

export default EditAccessPackageContainer;
