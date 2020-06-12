import React, {useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AccessPackageList from "./access_package_list";
import AccessPackageAdd from "./add/access_package_add";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import {fetchEntities} from "../../data/redux/dispatchers/entity";
import {makeStyles} from "@material-ui/core/styles";
import LoadingProgress from "../../common/status/LoadingProgress";
import {fetchAccess} from "../../data/redux/dispatchers/access_package";
import AppContext from "../../data/context/AppContext";
import {fetchClients} from "../../data/redux/dispatchers/client";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const AccessPackageContainer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);
    const access = useSelector(state => state.access_package.accessPackages);
    const context = useContext(AppContext);

    useEffect(() => {
            dispatch(fetchAccess(context.currentOrganisation.name));
            dispatch(fetchComponents());
            dispatch(fetchEntities());
            dispatch(fetchClients(context.currentOrganisation.name));
        }, [dispatch, context.currentOrganisation.name]
    );

    if (!componentConfiguration || componentConfiguration.length === 0 || !access) {
        return <LoadingProgress/>;
    } else {
        return (
            <div className={classes.root}>
                <AccessPackageList/>
                <AccessPackageAdd/>
            </div>
        );
    }
};

AccessPackageContainer.propTypes = {};


export default AccessPackageContainer;
