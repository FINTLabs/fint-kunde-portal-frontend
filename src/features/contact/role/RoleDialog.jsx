import React, {useContext, useEffect} from "react";
import {styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import {useDispatch, useSelector} from "react-redux";
import RolesIcon from "@mui/icons-material/LockOpenRounded";
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
} from "@mui/material";
import Button from "@mui/material/Button";
import AppContext from "../../../data/context/AppContext";

const PREFIX = 'RoleDialog';

const classes = {
    dialogTitle: `${PREFIX}-dialogTitle`
};

const Root = styled('div/')((
    {
        theme
    }
) => ({
    [`& .${classes.dialogTitle}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText
    }
}));

const RoleDialog = props => {
    const {onClose, open} = props;
    const dispatch = useDispatch();
    const roles = useSelector(state => state.roles.roles);
    const currentContact = useSelector(state => state.roles.roleContact);
    const loading = useSelector(state => state.roles.loading);

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
            dispatch(removeRole(organisationName, nin, roleId));
        } else {
            dispatch(addRole(organisationName, nin, roleId));
        }
    }

    const isAdmin = () => {
        return hasRole('ROLE_ADMIN');
    }
    if (currentContact) {

        return (
            <Dialog onClose={onClose} aria-labelledby="roller" open={open} fullWidth>
                <DialogTitle className={classes.dialogTitle}>Roller
                    - {`${currentContact.firstName} ${currentContact.lastName}`}</DialogTitle>
                <DialogContent>
                    <List>
                        {roles && roles.map((role) => (
                            <ListItem divider key={role.id} dense>
                                <ListItemIcon>
                                    <RolesIcon/>
                                </ListItemIcon>
                                <ListItemText primary={role.name}
                                              secondary={role.description.split('...').map((item, key) => {
                                                  return <React.Fragment
                                                      key={key}>{item}.<br/></React.Fragment>
                                              })}/>
                                <ListItemSecondaryAction>
                                    {loading ? <CircularProgress/> :
                                        <Switch
                                            edge="end"
                                            onChange={() => {
                                                onRoleChange(appContext.currentOrganisation.name, currentContact.nin, role.id)
                                            }}
                                            checked={hasRole(role.id) || isAdmin()}
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
    }

    return <div/>;
};

RoleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default RoleDialog;

