import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import AccessPackageList from "./access_package_list";
import AccessPackageAdd from "./add/access_packacke_add";
import {getAccessPackage} from "../../data/redux/actions/access_package";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import {fetchEntities} from "../../data/redux/dispatchers/entity";
import {makeStyles} from "@material-ui/core/styles";
import LoadingProgress from "../../common/status/LoadingProgress";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const AccessPackageContainer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const components = useSelector(state => state.component.components);
    const entities = useSelector(state => state.entity.entities);

    function matchEntitiesAndComponents() {
        components.map(component => {
            component["entities"] = entities.filter(entity => {
                if (entity.stereotype === 'hovedklasse' && entity.abstrakt === false) {
                    const componentStringForMatch = "no.fint" + component.basePath.replace(/\//g, ".");
                    const entityIdForMatch = entity.id.identifikatorverdi.substring(0, entity.id.identifikatorverdi.lastIndexOf("."));

                    return (entityIdForMatch === componentStringForMatch)
                }
                return false;
            });
            return component;
        });
    }

    if (components && entities && components.length > 0 && entities.length > 0) {
        matchEntitiesAndComponents();
    }
    useEffect(() => {
            dispatch(getAccessPackage());
            dispatch(fetchComponents());
            dispatch(fetchEntities());
        }, []
    );


    if (!entities || entities.length === 0) {
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
