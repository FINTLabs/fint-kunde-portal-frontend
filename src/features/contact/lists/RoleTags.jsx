import React from 'react';
import {useTheme} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import RolesIcon from "@material-ui/icons/LockOpenRounded";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const RoleTags = ({contactRoles, orgId, roleTypes}) => {
    const theme = useTheme();

    if (roleTypes) {
        return <Box width="80%">

            {contactRoles
                .filter(role => role.endsWith(orgId))
                .map(role => role.replace(`@${orgId}`, ''))
                .map(role => roleTypes.filter(r => r.id === role)[0])
                .map(role => (
                    <Chip key={role.id}
                          icon={<RolesIcon/>}
                          size="small"
                          style={{
                              marginRight: theme.spacing(),
                              marginTop: theme.spacing()
                          }}
                          label={role.name}/>
                ))}
        </Box>
    }
    return null;
};

RoleTags.propTypes = {
    orgId: PropTypes.string.isRequired,
    roleTypes: PropTypes.array,
    contactRoles: PropTypes.array.isRequired
}
export default RoleTags;
