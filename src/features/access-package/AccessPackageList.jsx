import React, {useContext, useState} from "react";
import { styled } from '@mui/material/styles';
import {Divider, List, Typography} from "@mui/material";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import {useDispatch, useSelector} from "react-redux";
import EditAccessPackageContainer from "./edit/EditAccessPackageContainer";
import AccessApi from "../../data/api/AccessApi";
import {fetchAccess} from "../../data/redux/dispatchers/access_package";
import AppContext from "../../data/context/AppContext";
import AccessPackageListItem from "./view/AccessPackageListItem";
import SavedSuccessSnackbar from "./view/SavedSuccessSnackbar";
import {setAccessPackageBeforeChanges, setSelectedForEditingPackage} from "../../data/redux/actions/access_package";
import WarningMessageBox from "../../common/message-box/WarningMessageBox";

const PREFIX = 'AccessPackageList';

const classes = {
    root: `${PREFIX}-root`,
    componentList: `${PREFIX}-componentList`,
    title: `${PREFIX}-title`,
    listItem: `${PREFIX}-listItem`,
    itemAvatar: `${PREFIX}-itemAvatar`,
    dialogButtons: `${PREFIX}-dialogButtons`,
    buttonDeleteAccessPackage: `${PREFIX}-buttonDeleteAccessPackage`,
    buttonDontDeleteAccessPackage: `${PREFIX}-buttonDontDeleteAccessPackage`,
    dialogContent: `${PREFIX}-dialogContent`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        display: "flex",
        justifyContent: "center"
    },

    [`& .${classes.componentList}`]: {
        width: "75%"
    },

    [`& .${classes.title}`]: {
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(1)
    },

    [`& .${classes.listItem}`]: {
        borderBottom: "1px dashed lightgray"
    },

    [`& .${classes.itemAvatar}`]: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.light
    },

    [`& .${classes.dialogButtons}`]: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        alignSelf: "center"
    },

    [`& .${classes.buttonDeleteAccessPackage}`]: {
        margin: theme.spacing(1),
        color: "#FFF",
        backgroundColor: theme.palette.primary.dark,
    },

    [`& .${classes.buttonDontDeleteAccessPackage}`]: {
        margin: theme.spacing(1),
    },

    [`& .${classes.dialogContent}`]: {
        display: "flex",
        flexDirection: "column"
    }
}));

const AccessPackageList = () => {

    const dispatch = useDispatch();
    const packages = useSelector(state => state.access_package.accessPackages);
    const oldAccessPackage = useSelector(state => state.access_package.selectedAccessPackageBeforeEdit);
    const selectedForEditingId = useSelector(state => state.access_package.selectedForEditing);
    const [editOpen, setEditOpen] = useState(false);
    const [openSave, setOpenSave] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [packageToDelete, setPackageToDelete] = React.useState(null);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const context = useContext(AppContext);
    const _ = require('lodash');
    const deleteMessageText = packageToDelete != null ? "Vil du fjerne tilgangspakken " + packageToDelete.name + "?" : "";

    let selectedAccessPackage = undefined;
    packages.map(ap => {
        if (ap.dn === selectedForEditingId) {
            selectedAccessPackage = ap;
        }
        return ap;
    });

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    };

    function deleteAccessPackage(accessPackage) {
        AccessApi.deleteAccess(accessPackage, context.currentOrganisation.name)
            .then(response => {
                if (response.status === 204) {
                    setOpenDialog(false);
                    dispatch(fetchAccess(context.currentOrganisation.name));
                    setSnackBarMessage(accessPackage.name + " slettet");
                    setSnackBarOpen(true);
                } else {
                    setOpenDialog(false);
                    dispatch(fetchAccess(context.currentOrganisation.name));
                    setSnackBarMessage("Noe gikk galt: " + response.status + " " + response.statusText);
                    setSnackBarOpen(true);
                }
            });
    }

    function handleEditClose() {
        setEditOpen(false);
        dispatch(fetchAccess(context.currentOrganisation.name));
    }

    function handleSaveClose() {
        setOpenSave(false);
    }

    function openEdit(dn, accessPackage) {

        const newPackage = {};
        newPackage.collection = [...accessPackage.collection];
        newPackage.read = [...accessPackage.read];
        newPackage.modify = [...accessPackage.modify];
        newPackage.clients = [...accessPackage.clients];
        newPackage.components = [...accessPackage.components];
        newPackage.name = accessPackage.name;
        newPackage.description = accessPackage.description;
        newPackage.dn = accessPackage.dn;
        newPackage.self = accessPackage.self;

        setEditOpen(true);
        dispatch(setSelectedForEditingPackage(dn));
        dispatch(setAccessPackageBeforeChanges(newPackage));
    }

    function handleClose(confirmed) {
        if (confirmed) {
            deleteAccessPackage(packageToDelete);

        }
        setOpenDialog(false);
    }

    function openDeleteAccessPackageDialog(accessPackage) {
        setPackageToDelete(accessPackage);
        setOpenDialog(true);
    }

    function handleSaveAccess() {
        if (!_.isEqual(oldAccessPackage, selectedAccessPackage)) {
            setOpenSave(!openSave);
        } else {
            handleEditClose();
        }
    }


    if (packages) {
        return (
            <div>
                <div className={classes.root}>
                    <div className={classes.componentList}>
                        <FeatureHelperText>
                            <p>En tilgangspakke benyttes for å sette opp riktige tilganger til klienter du oppretter
                                i kundeportalen.</p>
                            <p>Du kan velge fra pakkeoversikten for å se innholdet i standardpakker eller lage en
                                egendefinert tilgangspakke.</p>
                        </FeatureHelperText>
                        <Typography variant="h5" className={classes.title}>
                            Tilgangspakker
                        </Typography>
                        <Divider/>
                        <List>
                            {packages.map(accessPackage => (
                                <AccessPackageListItem
                                    key={accessPackage.dn}
                                    classes={classes}
                                    accessPackage={accessPackage}
                                    openEdit={openEdit}
                                    openDeleteAccessPackageDialog={openDeleteAccessPackageDialog}
                                />
                            ))
                            }
                        </List>
                        <EditAccessPackageContainer open={editOpen} handleClose={handleEditClose}
                                                    handleSaveAccess={handleSaveAccess} setEditOpen={setEditOpen}
                                                    openSave={openSave} handleSaveClose={handleSaveClose}
                                                    setSnackBarOpen={setSnackBarOpen}
                                                    setSnackBarMessage={setSnackBarMessage}
                        />
                    </div>
                    <WarningMessageBox
                        show={openDialog}
                        onClose={handleClose}
                        message={deleteMessageText}
                        title={"Fjerne tilgangspakke"}
                    />
                    <SavedSuccessSnackbar open={snackBarOpen} close={handleSnackBarClose}
                                          message={snackBarMessage}/>
                </div>
            </div>
        );
    } else {
        return (<Root></Root>);
    }
};
export default AccessPackageList;
