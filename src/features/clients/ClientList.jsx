import React, {Component} from "react";
import { styled } from "@mui/material/styles";
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
    Tab,
    Tabs,
    Box
} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import ClientIcon from "@mui/icons-material/ImportantDevices";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import ClientView from "./view/ClientView";
import {withContext} from "../../data/context/withContext";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import WarningMessageBox from "../../common/message-box/WarningMessageBox";
import Sort from "../../common/utils/Sort";

const PREFIX = 'ClientList';

const classes = {
    styledDiv: `${PREFIX}-root`,
    componentList: `${PREFIX}-componentList`,
    title: `${PREFIX}-title`,
    listItem: `${PREFIX}-listItem`,
    itemAvatar: `${PREFIX}-itemAvatar`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        display: "flex",
        justifyContent: "center"
    },

    [`& .${classes.componentList}`]: {
        width: "75%"
    },

    [`& .${classes.title}`]: {
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(1)
    },

    [`& .${classes.listItem}`]: {
        borderBottom: "1px dashed lightgray"
    },

    [`& .${classes.itemAvatar}`]: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.light
    }
}));

class ClientList extends Component {
    editClient = client => {
        this.setState({
            open: true,
            clientToEdit: client
        });
    };
    onCloseEdit = () => {
        this.setState({open: false});
    };
    updateClient = client => {
        const {currentOrganisation} = this.props.context;
        this.props.updateClient(client, currentOrganisation.name);
    };
    deleteClient = client => {
        const {currentOrganisation} = this.props.context;
        this.props.deleteClient(client, currentOrganisation.name);
        this.setState({
            notify: true,
            clientDeletedName: client.name
        });
    };

    handleChange = (event, newValue) => {
        this.setState({
                isManaged:newValue,
            })
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
            clients: this.props.clients,
            clientToEdit: null,
            clientToDelete: null,
            open: false,
            notify: false,
            clientDeletedName: null,
            askToDelete: false,
            message: "",
            isManaged: false,
        };
    }

    render() {
        // const {classes} = this.props;
        const clients = this.props.clients.sort(Sort.alphabetically);

        return (
            <div>
                <AutoHideNotification
                    showNotification={this.state.notify}
                    message={`Klienten ${this.state.clientDeletedName} ble slettet!`}
                    onClose={this.onCloseNotification}
                />
                <WarningMessageBox
                    show={this.state.askToDelete}
                    message={this.state.message}
                    onClose={this.onCloseDelete}
                />
                <Root sx={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <div className={classes.componentList}>
                        <FeatureHelperText>
                            <p>
                                En klient er påloggingsinformasjon som brukes av en integrasjon
                                for å få tilgang til en komponent. Dette kan f.eks. være et IDM
                                system, eller en integrasjonsbuss (BizTalk).
                            </p>
                            <p>
                                Klienten må registreres før integrasjonen kan taes i bruk. En
                                integrasjon må få opprettet påloggingsinformasjon og bli gitt
                                tilgang til de komponentene det skal levere data for.
                                Påloggingsinformasjonen og informasjon om endepunkter må oppgis
                                til den som skal installere og konfigurere integrasjonen.
                            </p>
                            <p>
                                Automatisk opprettede klienter er generert ved oppsett av nye tjenester,
                                eliminerer behovet for manuell håndtering og utveksling av autentiseringsinformasjon.
                                De blir etablert for å møte et tilgangsbehov i et undersystem i FINT.
                            </p>
                        </FeatureHelperText>
                        <Typography variant="h5" className={classes.title}>
                            Klienter
                        </Typography>
                        <Divider/>

                        <Box sx={{borderBottom: 1, borderBottomColor: "divider"}}>
                            <Tabs
                                value={this.state.isManaged}
                                onChange={this.handleChange}
                                aria-label="hvordan-client-er-opprettet"
                            >
                                <Tab value={false} label="Manuelt opprettet" />
                                <Tab value={true} label="Automatisk opprettet" />
                            </Tabs>
                        </Box>

                        <List id={"clientList"}>
                            {clients
                                .filter(client => client.managed === this.state.isManaged)
                                .map(client => (
                                <ListItem className={classes.listItem} key={client.dn}>
                                    <ListItemAvatar>
                                        <Avatar className={classes.itemAvatar}>
                                            <ClientIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={client.shortDescription}
                                        secondary={client.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            aria-label="Edit"
                                            onClick={() => this.editClient(client)}
                                            disabled={this.state.isManaged}
                                        >
                                            <Edit/>
                                        </IconButton>
                                        <IconButton
                                            aria-label="Delete"
                                            onClick={() => this.askToDelete(client)}
                                            disabled={this.state.isManaged}
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Root>
                <ClientView
                    open={this.state.open}
                    client={this.state.clientToEdit}
                    onClose={this.onCloseEdit}
                    updateClient={this.updateClient}
                />
            </div>
        );
    }
}

ClientList.propTypes = {
    clients: PropTypes.array.isRequired
};

export default (withContext(ClientList));
