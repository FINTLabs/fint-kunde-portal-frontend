import React, {Component} from "react";
import { styled } from '@mui/material/styles';
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import AdapterIcon from "@mui/icons-material/Link";
import ApiIcon from "@mui/icons-material/WebAsset";
import ClientIcon from "@mui/icons-material/ImportantDevices";
import {fetchAdapters} from "../../data/redux/dispatchers/adapter";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchClients} from "../../data/redux/dispatchers/client";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import LoadingProgress from "../../common/status/LoadingProgress";
import {withContext} from "../../data/context/withContext";
import FeatureHelperText from "../../common/help/FeatureHelperText";

const PREFIX = 'Dashboard';

const classes = {
    styledDiv: `${PREFIX}-styledDiv`,
    cardContent: `${PREFIX}-cardContent`,
    cardLink: `${PREFIX}-cardLink`,
    card: `${PREFIX}-card`,
    cardHeader: `${PREFIX}-cardHeader`,
    avatar: `${PREFIX}-avatar`
};

const StyledDiv = styled("div")((
    {
        theme
    }
) => ({
    [`& .${classes.styledDiv}`]: {
        marginTop: theme.spacing(3),
        width: "100%",
        height: "100%"
    },

    [`& .${classes.cardContent}`]: {
        textAlign: "center"
    },

    [`& .${classes.cardLink}`]: {
        textDecoration: "none"
    },

    [`& .${classes.card}`]: {},
    [`& .${classes.cardHeader}`]: {},

    [`& .${classes.avatar}`]: {
        margin: 10,
        color: "#fff",
        backgroundColor: theme.palette.secondary.light
    }
}));

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.refresh();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (
            this.props.context.currentOrganisation !==
            prevProps.context.currentOrganisation
        ) {
            this.refresh();
        }
    }

    refresh = () => {
        this.props.fetchAdapters(this.props.context.currentOrganisation.name);
        this.props.fetchClients(this.props.context.currentOrganisation.name);
        this.props.fetchComponents();
    };

    render() {
        const { clients, adapters, components} = this.props;
        if (clients && adapters && components) {
            return (
                <StyledDiv className={classes.styledDiv}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <FeatureHelperText>
                                <p>
                                    FINT kundeportal skal benyttes av fylkeskommuner og andre
                                    organisasjoner som benytter FINT til å gi tilgang til egne
                                    data.
                                </p>
                                <p>
                                    Kundeportalen skal gi personer som har fått tildelt roller i
                                    en organisasjon mulighet for å administrere tilgangsstyring
                                    til data.
                                </p>
                            </FeatureHelperText>
                        </Grid>
                    </Grid>

                    <Grid container spacing={10}>
                        <Grid item xs={4}>
                            <Link to="clients" className={classes.cardLink}>
                                <Card className={classes.card} id={"clientCard"}
                                >
                                    <CardHeader
                                        title="Klienter"
                                        avatar={
                                            <Avatar className={classes.avatar}>
                                                <ClientIcon className={classes.avatar}/>
                                            </Avatar>
                                        }
                                        subheader="Antall"
                                        className={classes.cardHeader}
                                    />
                                    <Divider/>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h2">{clients.length}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>

                        <Grid item xs={4}>
                            <Link to="adapters" className={classes.cardLink}>
                                <Card className={classes.card} id={"adapterCard"}
                                >
                                    <CardHeader
                                        title="Adapter"
                                        avatar={
                                            <Avatar className={classes.avatar}>
                                                <AdapterIcon className={classes.avatar}/>
                                            </Avatar>
                                        }
                                        subheader="Antall"
                                    />
                                    <Divider/>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h2">{adapters.length}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>

                        <Grid item xs={4}>
                            <Link to="components" className={classes.cardLink}>
                                <Card className={classes.card} id={"componentCard"}>
                                    <CardHeader
                                        title="Komponenter"
                                        avatar={
                                            <Avatar className={classes.avatar}>
                                                <ApiIcon className={classes.avatar}/>
                                            </Avatar>
                                        }
                                        subheader="Antall"
                                    />
                                    <Divider/>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h2">
                                            {this.props.context.currentOrganisation.components.length}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    </Grid>
                </StyledDiv>
            );
        } else {
            return <LoadingProgress/>;
        }
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        adapters: state.adapter.adapters,
        components: state.component.components,
        clients: state.client.clients
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchAdapters: fetchAdapters,
            fetchClients: fetchClients,
            fetchComponents: fetchComponents
        },
        dispatch
    );
}

export default (
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withContext(Dashboard))
);
