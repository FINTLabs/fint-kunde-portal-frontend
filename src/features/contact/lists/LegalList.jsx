import React, {useContext, useState} from "react";
import { styled } from "@mui/material/styles";
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
import ContactIcon from "@mui/icons-material/Person";
import FeatureHelperText from "../../../common/help/FeatureHelperText";
import RolesIcon from "@mui/icons-material/LockOpenRounded";
import TooltipIconButton from "../../../common/button/TooltipIconButton";
import useFeatureEnabled from "../../../common/feature-toggle/useFeatureEnabled";
import RoleTags from "./RoleTags";
import {useDispatch, useSelector} from "react-redux";
import AppContext from "../../../data/context/AppContext";
import {setRoleContact} from "../../../data/redux/actions/roles";
import RoleDialog from "../role/RoleDialog";
import {
    fetchLegalContact,
    fetchTechnicalContacts
} from "../../../data/redux/dispatchers/organisation";

const PREFIX = 'LegalList';

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

function LegalList({ legalContact}) {
    const isRoleFeatureEnabled = useFeatureEnabled("roles-new");
    const roleTypes = useSelector(state => state.roles.roles);
    const orgId = useContext(AppContext).currentOrganisation.name;
    const [showRoleDialog, setShowRoleDialog] = useState(false);
    const dispatch = useDispatch();

    const manageRoles = contact => {
        dispatch(setRoleContact(contact));
        setShowRoleDialog(true);
    }

    const onCloseRoleDialog = () => {
        setShowRoleDialog(false);
        dispatch(fetchLegalContact(orgId));
        dispatch(fetchTechnicalContacts(orgId));
    }

    return (
        <StyledBox display="flex" justifyContent="center" mb={5}>
            {isRoleFeatureEnabled && <RoleDialog
                onClose={onCloseRoleDialog}
                open={showRoleDialog}
            />}
            <Box width="75%">
                <FeatureHelperText>
                    <p>Kontakter er personer som har tilgang til kundeportalen.</p>
                    <p>En juridisk kontakt er den som har det merkantile ansvaret.</p>
                    <p>
                        Tekniske kontakter er organisasjonens FINT administratorer. De vil
                        få driftsmeldinger tilsendt ved behov.
                    </p>
                    <p>
                        Ordinære driftsmeldinger sendes på epost. Kritiske driftmeldinger
                        sendes på epost og SMS.
                    </p>
                </FeatureHelperText>
                <Typography variant="h5">
                    Juridisk kontakt
                </Typography>
                <List id={"legalContactList"}>
                    <ListItem key={legalContact.dn}>
                        <ListItemAvatar>
                            <Avatar className={classes.itemAvatar}>
                                <ContactIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText id={"legalContactNameField"}
                                      primary={`${legalContact.firstName} ${legalContact.lastName}`}
                                      secondary={isRoleFeatureEnabled &&
                                      <RoleTags orgId={orgId} roleTypes={roleTypes}
                                                contactRoles={legalContact.roles}/>}
                                      secondaryTypographyProps={{component: 'div'}}
                        />
                        <ListItemSecondaryAction>
                            {isRoleFeatureEnabled &&
                            <TooltipIconButton
                                ariaLabel="Roles"
                                onClick={() => manageRoles(legalContact)}
                                id="manageRoles"
                                toolTip="Administrer roller for kontakten"
                            >
                                <RolesIcon/>
                            </TooltipIconButton>}
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Box>
        </StyledBox>
    );
}

LegalList.propTypes = {
    legalContact: PropTypes.object.isRequired
};
export default (LegalList);
