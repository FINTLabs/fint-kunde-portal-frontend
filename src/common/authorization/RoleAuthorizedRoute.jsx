import React, {useContext} from 'react';
import {Route} from "react-router-dom";
import {useSelector} from "react-redux";
import AppContext from "../../data/context/AppContext";
import PropTypes from "prop-types";

const RoleAuthorizedRoute = ({path, component, role}) => {

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
        return <Route path={path} component={component}/>;
    }

    return null;
};

RoleAuthorizedRoute.propTypes = {
    role: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    component: PropTypes.object.isRequired
};
export default RoleAuthorizedRoute;
