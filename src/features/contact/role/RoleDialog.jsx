import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {useDispatch, useSelector} from "react-redux";
import RolesIcon from "@material-ui/icons/LockOpenRounded";
import {addRole, fetchRoles, removeRole} from "../../../data/redux/dispatchers/roles";
import {
    CircularProgress,
    DialogActions,
    DialogContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Switch
} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppContext from "../../../data/context/AppContext";

const useStyles = makeStyles((theme) =>
    createStyles({
        dialogTitle: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.contrastText
        },
    }));
const RoleDialog = props => {
    const {onClose, open} = props;
    const dispatch = useDispatch();
    const roles = useSelector(state => state.roles.roles);
    const currentContact = useSelector(state => state.roles.roleContact);
    const loading = useSelector(state => state.roles.loading);
    const classes = useStyles();
    const appContext = useContext(AppContext);


    useEffect(() => {
        dispatch(fetchRoles());
    }, [dispatch]);

    const hasRole = roleId => {
        if (currentContact) {
            return currentContact.roles
                .includes(roleId + "@" + appContext.currentOrganisation.name);
        }
        return false;
    }
    const onRoleChange = (organisationName, nin, roleId) => {
        if (hasRole(roleId)) {
            console.log("Removing role");
            dispatch(removeRole(organisationName, nin, roleId));
        } else {
            console.log("Adding role");
            dispatch(addRole(organisationName, nin, roleId));
        }
    }

    return (
        <Dialog onClose={onClose} aria-labelledby="roller" open={open} fullWidth>
            <DialogTitle className={classes.dialogTitle}>Roller</DialogTitle>
            <DialogContent>
                <List>
                    {roles && roles.map((role) => (
                        <ListItem divider key={role.id}>
                            <ListItemIcon>
                                <RolesIcon/>
                            </ListItemIcon>
                            <ListItemText primary={role.name} secondary={role.description}/>
                            <ListItemSecondaryAction>
                                {loading ? <CircularProgress/> :
                                    <Switch
                                        edge="end"
                                        onChange={() => {
                                            onRoleChange(appContext.currentOrganisation.name, currentContact.nin, role.id)
                                        }}
                                        checked={hasRole(role.id)}
                                        inputProps={{'aria-labelledby': 'switch-role'}}
                                    />}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="secondary"
                    id={"componentOKButton"}
                >
                    Lukk
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RoleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default RoleDialog;

