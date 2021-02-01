import React, {useContext, useEffect} from 'react';
import AppContext from "../../../data/context/AppContext";
import {makeStyles} from "@material-ui/core/styles";
import {fetchAccess} from "../../../data/redux/dispatchers/access_package";
import {fetchComponents} from "../../../data/redux/dispatchers/component";
import {fetchEntities} from "../../../data/redux/dispatchers/entity";
import {fetchClients} from "../../../data/redux/dispatchers/client";
import {useDispatch, useSelector} from "react-redux";
import LoadingProgress from "../../../common/status/LoadingProgress";
import AddAccessPackageToClient from "./AddAccessPackageToClient";


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%"
    }
}));

const ClientTabAccess = (props) => {
    const {client} = props;
    const context = useContext(AppContext);
    const classes = useStyles();
    const dispatch = useDispatch();
    const access = useSelector(state => state.access_package.accessPackages);

    useEffect(() => {
            dispatch(fetchAccess(context.currentOrganisation.name));
            dispatch(fetchComponents());
            dispatch(fetchEntities());
            dispatch(fetchClients(context.currentOrganisation.name));
        }, [dispatch, context.currentOrganisation.name]
    );

    //if (!access) {
    //    return <LoadingProgress/>;
    //} else {
    if (access) {
        return (
            <div className={classes.root}>
                <AddAccessPackageToClient
                    client={client}/>
            </div>
        );
    }
    else {
        return <div/>
    }
    //}
};

export default ClientTabAccess;
