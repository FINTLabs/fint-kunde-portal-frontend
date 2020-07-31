import React, {useContext, useState} from "react";
import {Divider, List, makeStyles, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import FeatureHelperText from "../../../common/help/FeatureHelperText";
import AppContext from "../../../data/context/AppContext";
import {updateAccessPackages} from "../../../data/redux/actions/access_package";
import ClientTabAccessPackageList from "./client_tab_access_package_list";
import AccessApi from "../../../data/api/AccessApi";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    componentList: {
        width: "75%"
    },
    title: {
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(1)
    },
    listItem: {
        borderBottom: "1px dashed lightgray"
    },
    itemAvatar: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.main
    },
    circularProgress: {
        marginRight: theme.spacing(1),
    },
}));

const AddAccessPackageToClient = (props) => {
    const {client} = props;
    const classes = useStyles();
    const packages = useSelector(state => state.access_package.accessPackages);
    const [isFetchingClients, setIsFetchingClients] = useState(false);
    const [selectedName, setSelectedName] = useState("");
    const dispatch = useDispatch();
    const context = useContext(AppContext);

    function handleClientChange(event, client, accessPackage, name) {
        let newClients = [];
        let newAccessPackage = {...accessPackage};
        setIsFetchingClients(true);
        setSelectedName(name);
        if (event.target.checked) {
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
    }

    if (packages) {
        return (
            <div>
                <div className={classes.root}>
                    <div className={classes.componentList}>
                        <FeatureHelperText>
                            <p>En tilgangspakke benyttes for å sette opp riktige tilganger til klienter du oppretter i
                                kundeportalen.</p>
                            <p></p>
                        </FeatureHelperText>
                        <Typography variant="h5" className={classes.title}>
                            Tilgangspakker
                        </Typography>
                        <Divider/>
                        <List>
                            {packages.map(accessPackage => (
                                <ClientTabAccessPackageList
                                    key={accessPackage.dn}
                                    client={client}
                                    classes={classes}
                                    accessPackage={accessPackage}
                                    handleClientChange={handleClientChange}
                                    disabled={isFetchingClients}
                                    fetching={isFetchingClients}
                                    selectedName={selectedName}
                                />
                            ))
                            }
                        </List>
                    </div>
                </div>
            </div>
        );
    } else {
        return (<></>);
    }

};
export default AddAccessPackageToClient;
