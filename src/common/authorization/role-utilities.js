export const getFullyQualifiedRole = (role, currentOrganisation) => {
    return `${role}@${currentOrganisation}`;
}

export const hasRoleInCurrentOrganisation = (me, currentOrganisation) => {

    if (me) {
        return me.roles.filter(role => role.endsWith(currentOrganisation)).length > 0;
    }

    return false;
}
