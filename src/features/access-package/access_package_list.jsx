import React, {useState} from "react";
import {
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    Typography
} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import {useDispatch, useSelector} from "react-redux";
import {
    setSelectedForEditingPackage,
    updateAccessPackages
} from "../../data/redux/actions/access_package";
import EditAccessPackage from "./edit/edit_access_package";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import access_package from "../../data/redux/reducers/access_package";

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
        alignSelf:"center"
    },
    buttonDeleteAccessPackage: {
        margin: theme.spacing(1),
        color: "#FFF",
        backgroundColor: theme.palette.primary.dark,
    },
    buttonDontDeleteAccessPackage:{
        margin: theme.spacing(1),
    },
    dialogContent: {
        display: "flex",
        flexDirection:"column"
    }
}));

const AccessPackageList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const packages = useSelector(state => state.access_package.accessPackages);
    const [editOpen, setEditOpen] = useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [packageToDelete, setPackageToDelete] = React.useState({});

    function deleteAccessPackage(accessPackage) {
        const newArray = [...packages];
        newArray.splice(newArray.indexOf(accessPackage), 1);
        dispatch(updateAccessPackages(newArray));
        setOpenDialog(false)
    }

    function handleEditClose() {
        setEditOpen(false);
    }

    function openEdit(id) {
        setEditOpen(true);
        dispatch(setSelectedForEditingPackage(id));
    }

    function handleClose() {
        setOpenDialog(false);
    }
    function openDeleteAccessPackageDialog(accessPackage) {
        setOpenDialog(true);
        setPackageToDelete(accessPackage);
    }

    if (packages && packages.length > 0) {
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
                                <ListItem className={classes.listItem} key={accessPackage.id}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.itemAvatar}>
                                            <LockIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={accessPackage.shortDescription}
                                        secondary={accessPackage.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            aria-label="Edit"
                                            onClick={() => openEdit(accessPackage.id)}
                                        >
                                            <Edit/>
                                        </IconButton>
                                        <IconButton
                                            aria-label="Delete"
                                            onClick={() => openDeleteAccessPackageDialog(accessPackage)}
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <EditAccessPackage open={editOpen} handleClose={handleEditClose}/>
                    </div>
                    <Dialog onClose={handleClose} aria-labelledby="Fjerne tilgangspakke" open={openDialog}>
                        <DialogTitle id="Fjerne mottaker">Fjern tilgangspakke</DialogTitle>
                        <DialogContent className={classes.dialogContent}>
                            Vil du fjerne tilgangspakken: {packageToDelete.shortDescription} ?
                            <Typography variant="caption">(Fjerningen er permanent)</Typography>
                        </DialogContent>
                        <div className={classes.dialogButtons}>
                            <Button variant="outlined" className={classes.buttonDontDeleteAccessPackage} onClick={handleClose}>Nei</Button>
                            <Button className={classes.buttonDeleteAccessPackage} variant="outlined" onClick={() => deleteAccessPackage(packageToDelete)}>Ja</Button>
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    } else {
        return (<></>);
    }

};
export default AccessPackageList;
