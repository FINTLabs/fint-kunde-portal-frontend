import React, {useContext} from 'react';
import {useSelector} from "react-redux";
import AppContext from "../../data/context/AppContext";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {useFeatureEnabled} from "@fintlabs/fint-feature-toggle-react";
import {getFullyQualifiedRole} from "./role-utilities";


const RoleAuthorizationMenu = ({children, role}) => {
    const me = useSelector(state => state.me.me);
    const currentOrganisation = useContext(AppContext).currentOrganisation.name;
    const isRoleFeatureEnabled = useFeatureEnabled("roles");

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
