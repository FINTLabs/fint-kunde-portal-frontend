import React, {useContext} from 'react';
import {useSelector} from "react-redux";
import AppContext from "../../data/context/AppContext";
import PropTypes from "prop-types";

const RoleAuthorization = ({children, role}) => {
    const me = useSelector(state => state.me.me);
    const currentOrganisation = useContext(AppContext).currentOrganisation.name;

    const getFullyQualifiedRole = (role) => {
        return `${role}@${currentOrganisation}`;
    }

    const authorized = () => {
        if (!me) {
            return false
        }
        return me.roles.includes(getFullyQualifiedRole(role))
            || me.roles.includes(getFullyQualifiedRole('ROLE_ADMIN'));
    }

    if (authorized()) {
        return <>
            {children}
        </>;
    }


    return null;
};

RoleAuthorization.propTypes = {
    children: PropTypes.node.isRequired,
    role: PropTypes.string.isRequired,
};

export default RoleAuthorization;
