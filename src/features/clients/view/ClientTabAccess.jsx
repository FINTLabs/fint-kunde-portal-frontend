import React, {useContext} from 'react';
import AppContext from "../../../data/context/AppContext";
import {makeStyles} from "@material-ui/core/styles";
import AccessPackageList from "../../access-package/access_package_list";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%"
    }
}));

const ClientTabAccess = () => {
    const context = useContext(AppContext);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AccessPackageList/>
        </div>
    );
};

export default ClientTabAccess;