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
    Typography,
    withStyles
} from "@material-ui/core";
import ContactIcon from "@material-ui/icons/Person";
import FeatureHelperText from "../../../common/help/FeatureHelperText";
import RolesIcon from "@material-ui/icons/LockOpenRounded";
import TooltipIconButton from "../../../common/button/TooltipIconButton";
import useFeatureEnabled from "../../../common/feature-toggle/useFeatureEnabled";
import RoleTags from "./RoleTags";
import {useDispatch, useSelector} from "react-redux";
import AppContext from "../../../data/context/AppContext";
import {setRoleContact} from "../../../data/redux/actions/roles";
import RoleDialog from "../role/RoleDialog";

const styles = theme => ({
    itemAvatar: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.light
    },
});

function LegalList({classes, legalContact}) {
    const isRoleFeatureEnabled = useFeatureEnabled("roles");
    const roleTypes = useSelector(state => state.roles.roles);
    const orgId = useContext(AppContext).currentOrganisation.name;
    const [showRoleDialog, setShowRoleDialog] = useState(false);
    const dispatch = useDispatch();

    const manageRoles = contact => {
        dispatch(setRoleContact(contact));
        setShowRoleDialog(true);
    }

    return (
        <Box display="flex" justifyContent="center" mb={5}>
            {isRoleFeatureEnabled && <RoleDialog
                onClose={() => setShowRoleDialog(false)}
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
        </Box>
    );
}

LegalList.propTypes = {
    legalContact: PropTypes.object.isRequired
};
export default withStyles(styles)(LegalList);
