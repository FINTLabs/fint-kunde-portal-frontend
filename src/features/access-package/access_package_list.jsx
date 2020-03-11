import React, {Component} from "react";
import PropTypes from "prop-types";
import {
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    withStyles
} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";
import LockIcon from "@material-ui/icons/Lock";
import {withContext} from "../../data/context/withContext";
import FeatureHelperText from "../../common/help/FeatureHelperText";

const styles = theme => ({
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
    }
});

class AccessPackageList extends Component {
    editClient = accessPackage => {
        this.setState({
            open: true,
            clientToEdit: accessPackage
        });
    };
    onCloseEdit = () => {
        this.setState({open: false});
    };
    updateClient = client => {
        const {currentOrganisation} = this.props.context;
        this.props.updateClient(client, currentOrganisation.name);
    };
    deleteClient = accessPackage => {
        const {currentOrganisation} = this.props.context;
        this.props.deleteClient(accessPackage, currentOrganisation.name);
        this.setState({
            notify: true,
            clientDeletedName: accessPackage.name
        });
    };

    askToDelete = client => {
        this.setState({
            askToDelete: true,
            message: `Er du sikker på at du vil slette '${
                client.name
            }'? Endringen kan ikke tilbakestilles!`,
            clientToDelete: client
        });
    };

    onCloseDelete = confirmed => {
        this.setState({
            askToDelete: false
        });

        if (confirmed) {
            this.deleteClient(this.state.clientToDelete);
        }
    };

    onCloseNotification = () => {
        this.setState({
            notify: false
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            clientToEdit: null,
            clientToDelete: null,
            open: false,
            notify: false,
            clientDeletedName: null,
            askToDelete: false,
            message: ""
        };
    }

    render() {
        const {classes} = this.props;
        const packages = [
            {
                packageId: 1,
                shortDescription: "Full Tilgang",
                name: "full_tilgang_til_alt_access_package@fint.no",

            },
            {
                packageId: 2,
                shortDescription: "Visma Inschool-tilgang",
                name: "visma_inschool_access_package@fint.no",

            },
            {
                packageId: 3,
                shortDescription: "Vigo BAS-tilgang",
                name: "vigo_bas_access_package@fint.no",

            }
        ];

        return (
            <div>
                <div className={classes.root}>
                    <div className={classes.componentList}>
                        <FeatureHelperText>
                            <p>En tilgangspakke benyttes for å sette opp riktige tilganger til klienter du oppretter i
                                kundeportalen.</p>
                            <p>Du kan velge fra pakkeoversikten for å se innholdet i standardpakker eller lage en
                                egendefinert
                                tilgangspakke.</p>
                        </FeatureHelperText>
                        <Typography variant="h5" className={classes.title}>
                            Tilgangspakker
                        </Typography>
                        <Divider/>
                        <List>
                            {packages.map(accessPackage => (
                                <ListItem className={classes.listItem} key={accessPackage.packageId}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.itemAvatar}>
                                            <LockIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={accessPackage.shortDescription}
                                        secondary={accessPackage.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            aria-label="Edit"
                                            onClick={() => this.editClient(accessPackage)}
                                        >
                                            <Edit/>
                                        </IconButton>
                                        <IconButton
                                            aria-label="Delete"
                                            onClick={() => this.askToDelete(accessPackage)}
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        );
    }
}

AccessPackageList.propTypes = {
    clients: PropTypes.array.isRequired
};

export default withStyles(styles)(withContext(AccessPackageList));
