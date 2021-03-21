import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import OrganisationApi from "../../../data/api/OrganisationApi";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import RoleDialog from "../role/RoleDialog";
import AppContext from "../../../data/context/AppContext";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import ContactIcon from "@material-ui/icons/Person";
import TooltipIconButton from "../../../common/button/TooltipIconButton";
import RolesIcon from "@material-ui/icons/LockOpenRounded";
import RemoveIcon from "@material-ui/icons/RemoveCircleRounded";
import SetLegalIcon from "@material-ui/icons/AccountBalance";
import {useDispatch, useSelector} from "react-redux";
import {setRoleContact} from "../../../data/redux/actions/roles";
import Chip from "@material-ui/core/Chip";
import useFeatureEnabled from "../../../common/feature-toggle/useFeatureEnabled";


const useStyles = makeStyles((theme) =>
    createStyles({
        title: {
            paddingLeft: theme.spacing(3),
            paddingBottom: theme.spacing(1)
        },
        listItem: {
            borderBottom: "1px dashed lightgray"
        },
        itemAvatar: {
            color: "#fff",
            backgroundColor: theme.palette.secondary.light
        },
        roleChip: {
            marginRight: theme.spacing(),
            marginTop: theme.spacing()
        }
    }));

const TechnicalList = props => {
    const [showConfirmRemoveContact, setShowConfirmRemoveContact] = useState(false);
    const [message, setMessage] = useState("");
    const [contact, setContact] = useState({});
    const classes = useStyles();
    const {technicalContacts} = props;
    const [showRoleDialog, setShowRoleDialog] = useState(false);
    const roleTypes = useSelector(state => state.roles.roles);
    const dispatch = useDispatch();
    const isRoleFeatureEnabled = useFeatureEnabled("roles");

    const appContext = useContext(AppContext);

    const askToRemoveContact = contact => {
        setShowConfirmRemoveContact(true);
        setMessage(`Er du sikker på at du vil fjerne ${contact.firstName} ${contact.lastName} fra organisasjonen?`);
        setContact(contact);
    };
    const onCloseRemoveContact = confirmed => {
        setShowConfirmRemoveContact(false);

        if (confirmed) {
            removeContact(contact);
        }
    };

    const removeContact = contact => {
        OrganisationApi.removeTechnicalContact(
            contact,
            appContext.currentOrganisation.name
        )
            .then(response => {
                props.notify(
                    `${contact.firstName} ${contact.lastName} ble fjernet.`
                );
                props.fetchTechnicalContacts();
            })
            .catch(error => {
                alert(error);
            });
    };

    const setLegalContact = contact => {
        OrganisationApi.unsetLegalContact(
            props.legalContact,
            appContext.currentOrganisation.name
        )
            .then(() => {
                OrganisationApi.setLegalContact(
                    contact,
                    appContext.currentOrganisation.name
                )
                    .then(() => {
                        props.notify("Juridisk ansvarlig er oppdatert.");
                        props.afterUpdateLegalContact();
                    })
                    .catch(() => {
                    });
            })
            .catch(() => {
            });
    };

    const manageRoles = contact => {
        dispatch(setRoleContact(contact));
        setShowRoleDialog(true);
    }

    const getRoleTags = (roles) => {
        if (roleTypes) {
            return roles
                .filter(role => role.endsWith(appContext.currentOrganisation.name))
                .map(role => role.replace(`@${appContext.currentOrganisation.name}`, ''))
                .map(role => roleTypes.filter(r => r.id === role)[0])
                .map(role => (
                    <Chip key={role.id}
                          icon={<RolesIcon/>}
                          size="small"
                          className={classes.roleChip}
                          label={role.name}/>
                ))
        }
        return null;
    }


    return (
        <Box display="flex" justifyContent="center">
            <WarningMessageBox
                show={showConfirmRemoveContact}
                message={message}
                onClose={onCloseRemoveContact}
            />
            {isRoleFeatureEnabled && <RoleDialog
                onClose={() => setShowRoleDialog(false)}
                open={showRoleDialog}
            />}
            <Box width="75%">
                <Typography variant="h5" className={classes.title}>
                    Teknisk kontakter
                </Typography>
                <Divider/>
                <List id={"technicalContactsList"}>
                    {technicalContacts.map(contact => (
                        <ListItem className={classes.listItem} key={contact.dn}>
                            <ListItemAvatar>
                                <Avatar className={classes.itemAvatar}>
                                    <ContactIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${contact.firstName} ${contact.lastName}`}
                                secondary={isRoleFeatureEnabled && getRoleTags(contact.roles)}
                                secondaryTypographyProps={{component: 'div'}}
                            />
                            <ListItemSecondaryAction>
                                {isRoleFeatureEnabled &&
                                <TooltipIconButton
                                    ariaLabel="Roles"
                                    onClick={() => manageRoles(contact)}
                                    id="manageRoles"
                                    toolTip="Administrer roller for kontakten"
                                >
                                    <RolesIcon/>
                                </TooltipIconButton>
                                }

                                <TooltipIconButton
                                    ariaLabel="Juridisk kontakt"
                                    onClick={() => setLegalContact(contact)}
                                    id="changeLegalButton"
                                    toolTip="Angi som juridisk kontakt"
                                >
                                    <SetLegalIcon/>
                                </TooltipIconButton>

                                <TooltipIconButton
                                    ariaLabel="Fjern kontakt"
                                    onClick={() => askToRemoveContact(contact)}
                                    id="removeUserButton"
                                    toolTip="Fjern teknisk kontakt"
                                >
                                    <RemoveIcon/>
                                </TooltipIconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}

TechnicalList.propTypes = {
    afterUpdateLegalContact: PropTypes.any.isRequired,
    fetchTechnicalContacts: PropTypes.any.isRequired,
    notify: PropTypes.any.isRequired,
    technicalContacts: PropTypes.array.isRequired
};
export default TechnicalList;
