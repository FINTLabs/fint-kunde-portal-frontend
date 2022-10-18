import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@mui/material";
import OrganisationApi from "../../../data/api/OrganisationApi";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import RoleDialog from "../role/RoleDialog";
import AppContext from "../../../data/context/AppContext";
import ContactIcon from "@mui/icons-material/Person";
import TooltipIconButton from "../../../common/button/TooltipIconButton";
import RolesIcon from "@mui/icons-material/LockOpenRounded";
import RemoveIcon from "@mui/icons-material/RemoveCircleRounded";
import SetLegalIcon from "@mui/icons-material/AccountBalance";
import {useDispatch, useSelector} from "react-redux";
import {setRoleContact} from "../../../data/redux/actions/roles";
import useFeatureEnabled from "../../../common/feature-toggle/useFeatureEnabled";
import RoleTags from "./RoleTags";
import {
    fetchLegalContact,
    fetchTechnicalContacts
} from "../../../data/redux/dispatchers/organisation";
import {styled} from "@mui/material/styles";

const PREFIX = 'TechnicalList';

const classes = {
    itemAvatar: `${PREFIX}-itemAvatar`
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`& .${classes.itemAvatar}`]: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.light
    }
}));

const TechnicalList = props => {
    const [showConfirmChangeLegal, setShowConfirmChangeLegal] = useState(false);
    const [legalContact, setLegalContact] = useState({});
    const [showConfirmRemoveContact, setShowConfirmRemoveContact] = useState(false);
    const [message, setMessage] = useState("");
    const [contact, setContact] = useState({});
    const {technicalContacts} = props;
    const [showRoleDialog, setShowRoleDialog] = useState(false);
    const dispatch = useDispatch();
    const isRoleFeatureEnabled = useFeatureEnabled("roles");
    const roleTypes = useSelector(state => state.roles.roles);
    const orgId = useContext(AppContext).currentOrganisation.name;

    const askToChangeLegalContact = contact => {
        setShowConfirmChangeLegal(true);
        setMessage(`Du endrer nå juridisk kontaktperson til ${contact.firstName} ${contact.lastName}. Ønsker du dette?`);
        setLegalContact(contact);
    };

    const onCloseChangeLegalContact = confirmed => {
        setShowConfirmChangeLegal(false);

        if (confirmed) {
            changeLegalContact(legalContact);
        }
    };

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
            orgId
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

    const changeLegalContact = contact => {
        OrganisationApi.unsetLegalContact(
            props.legalContact,
            orgId
        )
            .then(() => {
                OrganisationApi.setLegalContact(
                    contact,
                    orgId
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

    const onCloseRoleDialog = () => {
        dispatch(fetchLegalContact(orgId));
        dispatch(fetchTechnicalContacts(orgId));
        setShowRoleDialog(false);
    }

    return (
        <StyledBox display="flex" justifyContent="center">
            <WarningMessageBox
                show={showConfirmRemoveContact}
                message={message}
                onClose={onCloseRemoveContact}
            />
            <WarningMessageBox
                show={showConfirmChangeLegal}
                message={message}
                onClose={onCloseChangeLegalContact}
            />
            {isRoleFeatureEnabled && <RoleDialog
                onClose={onCloseRoleDialog}
                open={showRoleDialog}
            />}
            <Box width="75%">
                <Typography variant="h5">
                    Teknisk kontakter
                </Typography>
                <List id={"technicalContactsList"}>
                    {technicalContacts
                        .sort((a, b) => a.firstName > b.firstName ? 1 : -1)
                        .map(contact => (
                        <ListItem divider key={contact.dn}>
                            <ListItemAvatar>
                                <Avatar className={classes.itemAvatar}>
                                    <ContactIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${contact.firstName} ${contact.lastName}`}
                                secondary={isRoleFeatureEnabled &&
                                <RoleTags orgId={orgId} contactRoles={contact.roles}
                                          roleTypes={roleTypes}/>}
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
                                    // onClick={() => setLegalContact(contact)}
                                    onClick={() => askToChangeLegalContact(contact)}
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
        </StyledBox>
    );
}

TechnicalList.propTypes = {
    afterUpdateLegalContact: PropTypes.any.isRequired,
    fetchTechnicalContacts: PropTypes.any.isRequired,
    notify: PropTypes.any.isRequired,
    technicalContacts: PropTypes.array.isRequired
};
export default TechnicalList;
