import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import {Avatar, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import ClientIcon from "@material-ui/icons/ImportantDevices";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import {updateAccessPackages} from "../../../data/redux/actions/access_package";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    itemAvatar: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.main
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    tabPanel: {
        display: "flex",
        flexDirection: "row",
    },
    fab: {
        margin: "16px",
    },
    fabListItem: {
        display: "flex",
    },
    table: {},
    tableRow: {
        '&:nth-of-type(even)': {
            backgroundColor: "#fef3ef",
        },
    },
    icon: {
        margin: theme.spacing(1),
        verticalAlign: "middle",
    },
    header: {
        marginTop: theme.spacing(4),
    },
}));

const ClientSelection = (props) => {
    const classes = useStyles();
    const {selectedAccessPackage} = props;
    const clients = useSelector(state => state.client.clients);
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const dispatch = useDispatch();

    function findIndex(array, value) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].dn === value.dn) {
                return i;
            }
        }
        return -1;
    }

    function handleClientChange(event, client) {
        let newClients = [...selectedAccessPackage.clients];
        let newAccessPackages = [...accessPackages];
        let newAccessPackage = {...selectedAccessPackage};
        const accessPackageIndex = findIndex(newAccessPackages, newAccessPackage);
        if (newClients.includes(client.dn)) {
            let clientIndex = newClients.indexOf(client.dn);
            newClients.splice(clientIndex, 1);
        }else{
            newClients.push(client.dn);
        }
        newAccessPackage.clients = newClients;
        newAccessPackages[accessPackageIndex] = newAccessPackage;
        dispatch(updateAccessPackages(newAccessPackages));
    }

    return (
        <div className={classes.root}>
            <Typography variant="h4" className={classes.header}>Aktiver eller deaktiver klienter koblet til
                tilgangspakken</Typography>

            <List>
                {clients.map(client => {
                    return (
                        <ListItem className={classes.listItem} key={client.dn}>
                            <ListItemAvatar>
                                <Avatar className={classes.itemAvatar}>
                                    <ClientIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                {client.name}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <FormControl>
                                    <FormControlLabel
                                        control={<Switch checked={selectedAccessPackage.clients.includes(client.dn)}
                                                         onChange={(event) => handleClientChange(event, client)}
                                                         name={client.name}/>}
                                        label="Aktivert klient"
                                    />
                                </FormControl>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>

        </div>
    );
};

export default ClientSelection;