import React, {useContext, useState} from "react";
import { List } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import AppContext from "../../../data/context/AppContext";
import {updateAccessPackages} from "../../../data/redux/actions/access_package";
import ClientTabAccessPackageList from "./ClientTabAccessPackageList";
import AccessApi from "../../../data/api/AccessApi";

const AddAccessPackageToClient = (props) => {
    const {client} = props;
    const packages = useSelector(state => state.access_package.accessPackages);
    const [isFetchingClients, setIsFetchingClients] = useState(false);
    const [selectedName, setSelectedName] = useState("");
    const [accessPackageToSwitch, setAccessPackageToSwitch] = useState(null);
    const [switchValue, setSwitchValue] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const dispatch = useDispatch();
    const context = useContext(AppContext);

    function handleClientChangeConfirmed(confirmed) {
        if (confirmed) {
            handleClientChanging(accessPackageToSwitch, switchValue);
        }
        setShowWarning(false);
    }

    function handleClientChanging(accessPackage, connect) {
        let newClients = [];
        let newAccessPackage = {...accessPackage};
        setSelectedName(accessPackage.name);
        setIsFetchingClients(true);
        if (connect) {
            newClients.push(client.dn);
        }
        newAccessPackage.clients = newClients;

        AccessApi.updateAccess(newAccessPackage, context.currentOrganisation.name)
            .then(response => {
                if (response.status === 200) {
                    AccessApi.getAccess(context.currentOrganisation.name).then(r => {
                        if (r[0].status === 200) {
                            dispatch(updateAccessPackages(r[1]));
                            setIsFetchingClients(false);
                            setSelectedName("");
                        }
                    })
                }
            });
        setShowWarning(false);
    }

    if (packages) {
        return (
            <div>
                <List>
                    {packages.map(accessPackage => (
                        <ClientTabAccessPackageList
                            key={accessPackage.dn}
                            client={client}
                            accessPackage={accessPackage}
                            handleClientChange={handleClientChangeConfirmed}
                            disabled={isFetchingClients}
                            fetching={isFetchingClients}
                            selectedName={selectedName}
                            setAccessPackageToSwitch={setAccessPackageToSwitch}
                            showWarning={showWarning}
                            setShowWarning={setShowWarning}
                            setSwitchValue={setSwitchValue}
                            handleClientChanging={handleClientChanging}
                        />
                    ))
                    }
                </List>
            </div>
        );
    } else {
        return (<></>);
    }

};
export default AddAccessPackageToClient;
