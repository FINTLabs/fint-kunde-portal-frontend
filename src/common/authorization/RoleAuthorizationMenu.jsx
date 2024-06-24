import React, {useContext} from "react";
import {useSelector} from "react-redux";
import AppContext from "../../data/context/AppContext";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {getFullyQualifiedRole} from "./role-utilities";
import useFeatureEnabled from "../feature-toggle/useFeatureEnabled";


const RoleAuthorizationMenu = ({children, role}) => {
    const me = useSelector(state => state.me.me);
    const currentOrganisation = useContext(AppContext).currentOrganisation.name;
    const isRoleFeatureEnabled = useFeatureEnabled("roles-new");

    const authorized = () => {
        if (!me) {
            return false
        }
        return me.roles.includes(getFullyQualifiedRole(role, currentOrganisation))
            || me.roles.includes(getFullyQualifiedRole('ROLE_ADMIN', currentOrganisation));
    }

    if (!isRoleFeatureEnabled) {
        return <>{children}</>;
    }

    if (authorized()) {
        return <>
            {children}
        </>;
    }

    return <Redirect to="/"/>;
};

RoleAuthorizationMenu.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.string.isRequired,
};

export default RoleAuthorizationMenu;
