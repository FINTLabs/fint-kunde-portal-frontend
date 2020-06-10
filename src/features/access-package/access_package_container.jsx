import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AccessPackageList from "./access_package_list";
import AccessPackageAdd from "./add/access_packacke_add";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import {fetchEntities} from "../../data/redux/dispatchers/entity";
import {makeStyles} from "@material-ui/core/styles";
import LoadingProgress from "../../common/status/LoadingProgress";
import {fetchAccess} from "../../data/redux/dispatchers/access_package";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const AccessPackageContainer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);
    const access = useSelector(state => state.access_package.accessPackages);
    console.log("access: ",access);

    useEffect(() => {
            dispatch(fetchAccess("testing"));
            dispatch(fetchComponents());
            dispatch(fetchEntities());
        }, [dispatch]
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
