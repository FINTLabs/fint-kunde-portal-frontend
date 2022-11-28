import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AccessPackageList from "./AccessPackageList";
import AccessPackageAdd from "./add/add_access_package";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import {fetchEntities} from "../../data/redux/dispatchers/entity";
import LoadingProgress from "../../common/status/LoadingProgress";
import {fetchAccess} from "../../data/redux/dispatchers/access_package";
import AppContext from "../../data/context/AppContext";
import {fetchClients} from "../../data/redux/dispatchers/client";
import {fetchAccessTemplate} from "../../data/redux/dispatchers/access_package_template";

const AccessPackageContainer = () => {
    const dispatch = useDispatch();
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);
    const access = useSelector(state => state.access_package.accessPackages);
    const context = useContext(AppContext);

    useEffect(() => {
            dispatch(fetchAccess(context.currentOrganisation.name));
            dispatch(fetchComponents(context.currentOrganisation.name));
            dispatch(fetchEntities());
            dispatch(fetchAccessTemplate());
            dispatch(fetchClients(context.currentOrganisation.name));
        }, [dispatch, context.currentOrganisation.name]
    );

    function accessPackageLoaded(){
        return !componentConfiguration || componentConfiguration.length === 0 || !access;
    }

    if (accessPackageLoaded()) {
        return <LoadingProgress/>;
    } else {
        return (
            <div>
                <AccessPackageList/>
                <AccessPackageAdd/>
            </div>
        );
    }
};

AccessPackageContainer.propTypes = {};


export default AccessPackageContainer;
