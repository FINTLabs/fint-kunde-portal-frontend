import React, {useContext, useEffect} from "react";
import { styled } from "@mui/material/styles";
import AppContext from "../../../data/context/AppContext";
import {fetchAccess} from "../../../data/redux/dispatchers/access_package";
import {fetchComponents} from "../../../data/redux/dispatchers/component";
import {fetchEntities} from "../../../data/redux/dispatchers/entity";
import {fetchClients} from "../../../data/redux/dispatchers/client";
import {useDispatch, useSelector} from "react-redux";
import AddAccessPackageToClient from "./AddAccessPackageToClient";


const PREFIX = 'ClientTabAccess';

const classes = {
    root: `${PREFIX}-root`
};

const Root = styled('div/')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        backgroundColor: theme.palette.background.paper,
        width: "100%"
    }
}));

const ClientTabAccess = (props) => {
    const {client} = props;
    const context = useContext(AppContext);

    const dispatch = useDispatch();
    const access = useSelector(state => state.access_package.accessPackages);

    useEffect(() => {
            dispatch(fetchAccess(context.currentOrganisation.name));
            dispatch(fetchComponents());
            dispatch(fetchEntities());
            dispatch(fetchClients(context.currentOrganisation.name));
        }, [dispatch, context.currentOrganisation.name]
    );

    if (access) {
        return (
            <div className={classes.root}>
                <AddAccessPackageToClient
                    client={client}/>
            </div>
        );
    } else {
        return <div/>
    }
    //}
};

export default ClientTabAccess;
