import React, {useContext, useState} from "react";
import {Divider, List, makeStyles, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import FeatureHelperText from "../../../common/help/FeatureHelperText";
import AppContext from "../../../data/context/AppContext";
import {setSelectedForEditingPackage, updateAccessPackages} from "../../../data/redux/actions/access_package";
import AccessPackageListItem from "./access_package_list_item";
import ClientTabAccessPackageList from "./client_tab_access_package_list";
import AccessApi from "../../../data/api/AccessApi";
import LoadingProgress from "../../../common/status/LoadingProgress";

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
    dialogButtons: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        alignSelf: "center"
    },
    buttonDeleteAccessPackage: {
        margin: theme.spacing(1),
        color: "#FFF",
        backgroundColor: theme.palette.primary.dark,
    },
    buttonDontDeleteAccessPackage: {
        margin: theme.spacing(1),
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column"
    }
}));

const AddAccessPackageToClient = (props) => {
    const {client} = props;
    const classes = useStyles();
    const packages = useSelector(state => state.access_package.accessPackages);
    const [isFetchingClients, setIsFetchingClients] = useState(false);
    const dispatch = useDispatch();
    const context = useContext(AppContext);

    function handleClientChange(event, client, accessPackage) {
        let newClients = [];
        let newAccessPackage = {...accessPackage};
        setIsFetchingClients(true);
        if (event.target.checked) {
            newClients.push(client.dn);
        }
        newAccessPackage.clients = newClients;

        AccessApi.updateAccess(newAccessPackage, context.currentOrganisation.name)
            .then(response => {
                if (response.status === 200) {
                    AccessApi.getAccess(context.currentOrganisation.name).then(r => {
                        console.log(r);
                        if (r[0].status === 200) {
                            dispatch(updateAccessPackages(r[1]));
                            setIsFetchingClients(false);
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
                                    client={client}
                                    classes={classes}
                                    accessPackage={accessPackage}
                                    handleClientChange={handleClientChange}
                                    disabled={isFetchingClients}
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
