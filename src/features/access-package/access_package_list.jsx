import React, {useState} from "react";
import PropTypes from "prop-types";
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
import {setSelectedForEditingPackage, updateAccessPackage} from "../../data/redux/actions/access_package";
import EditAccessPackage from "./edit/edit_access_package";

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
    }
}));

const AccessPackageList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const packages = useSelector(state => state.access_package.accessPackages);
    const [editOpen, setEditOpen] = useState(false);

    function deleteAccessPackage(accessPackage) {
        const newArray = [...packages];
        newArray.splice(newArray.indexOf(accessPackage), 1);
        dispatch(updateAccessPackage(newArray));
    }

    function handleEditClose() {
        setEditOpen(false);
    }

    function openEdit(id) {
        setEditOpen(true);
        dispatch(setSelectedForEditingPackage(id));
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
                                            onClick={() => deleteAccessPackage(accessPackage)}
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        <EditAccessPackage open={editOpen} handleClose={handleEditClose}/>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<></>);
    }

};
export default AccessPackageList;
