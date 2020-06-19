import React, {useContext, useState} from "react";
import {Divider, List, makeStyles, Typography} from "@material-ui/core";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedForEditingPackage} from "../../data/redux/actions/access_package";
import EditAccessPackage from "./edit/edit_access_package";
import AccessApi from "../../data/api/AccessApi";
import {fetchAccess} from "../../data/redux/dispatchers/access_package";
import AppContext from "../../data/context/AppContext";
import RemoveAccessPackageDialog from "./view/remove_access_package_dialog";
import AccessPackageListItem from "./view/access_package_list_item";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    componentList: {
        width: "75%"
    },
    title: {
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(1)
    },
    listItem: {
        borderBottom: "1px dashed lightgray"
    },
    itemAvatar: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.main
    },
    dialogButtons: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        alignSelf: "center"
    },
    buttonDeleteAccessPackage: {
        margin: theme.spacing(1),
        color: "#FFF",
        backgroundColor: theme.palette.primary.dark,
    },
    buttonDontDeleteAccessPackage: {
        margin: theme.spacing(1),
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column"
    }
}));

const AccessPackageList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const packages = useSelector(state => state.access_package.accessPackages);
    const [editOpen, setEditOpen] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [packageToDelete, setPackageToDelete] = React.useState({});
    const context = useContext(AppContext);

    function deleteAccessPackage(accessPackage) {
        AccessApi.deleteAccess(accessPackage, context.currentOrganisation.name)
            .then(response => {
                if (response.status === 204) {
                    setOpenDialog(false);
                    dispatch(fetchAccess(context.currentOrganisation.name));
                }
            });
    }

    function handleEditClose() {
        dispatch(fetchAccess(context.currentOrganisation.name));
        setEditOpen(false);
    }

    function openEdit(dn) {
        setEditOpen(true);
        dispatch(setSelectedForEditingPackage(dn));
    }

    function handleClose() {
        setOpenDialog(false);
    }

    function openDeleteAccessPackageDialog(accessPackage) {
        setOpenDialog(true);
        setPackageToDelete(accessPackage);
    }

    function handleSaveAccess(accessPackage) {
        AccessApi.updateAccess(accessPackage, context.currentOrganisation.name)
            .then(response => {
                if (response.status === 200) {
                    setEditOpen(false);
                    dispatch(fetchAccess(context.currentOrganisation.name));
                }
            });
    }

    if (packages) {
        return (
            <div>
                <div className={classes.root}>
                    <div className={classes.componentList}>
                        <FeatureHelperText>
                            <p>En tilgangspakke benyttes for å sette opp riktige tilganger til klienter du oppretter i
                                kundeportalen.</p>
                            <p>Du kan velge fra pakkeoversikten for å se innholdet i standardpakker eller lage en
                                egendefinert
                                tilgangspakke.</p>
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
                        <EditAccessPackage open={editOpen} handleClose={handleEditClose}
                                           handleSaveAccess={handleSaveAccess}/>
                    </div>
                    <RemoveAccessPackageDialog
                        handleClose={handleClose}
                        openDialog={openDialog}
                        packageToDelete={packageToDelete}
                        deleteAccessPackage={deleteAccessPackage}
                        classes={classes}
                    />
                </div>
            </div>
        );
    } else {
        return (<></>);
    }

};
export default AccessPackageList;
