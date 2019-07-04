import React, {Component} from "react";
import {Divider, Typography, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import ComponentSelector from "../../common/test/ComponentSelector";
import {withContext} from "../../data/context/withContext";
import ComponentApi from "../../data/api/ComponentApi";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ZenDeskApi from "../../data/api/ZenDeskApi";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import OutlinedSelector from "./OutlinedSelector";
import Box from "@material-ui/core/Box";
import MeApi from "../../data/api/MeApi";
import ReactPolling from "react-polling";
import LoadingProgress from "../../common/status/LoadingProgress";

const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center"

    },
    content: {
        width: "75%"
    },
    ticketForm: {
        border: "1px solid",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        borderColor: theme.palette.grey[400],
    },
    title: {
        paddingLeft: theme.spacing(0),
        paddingBottom: theme.spacing(1)
    },
    component: {
        display: "flex",
    },
    group: {
        marginBottom: theme.spacing(1),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    ticketType: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
});

class SupportContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notify: false,
            notifyMessage: "",
            component: "",
            components: [],
            solution: "kunde-portal",
            shortDescription: "",
            description: "",
            ticketTypes: [],
            ticketPriorities: [],
            ticketType: "incident",
            ticketPriority: "low",
            meSupportId: 0,
            ticketSubmitted: false,
            ticketStatusUrl: "",
            newTicket: {},
        };
    }

    clearTicketForm = () => {
        this.setState({
            component: "",
            solution: "kunde-portal",
            shortDescription: "",
            description: "",
            ticketType: "incident",
            ticketPriority: "low",
            meSupportId: 0,
        });
    };

    notify = message => {
        this.setState({
            notify: true,
            notifyMessage: message
        });
    };

    onCloseNotification = () => {
        this.setState({
            notify: false,
            notifyMessage: ""
        });
    };

    getOrganisationComponents = organisationName => {
        ComponentApi.getOrganisationComponents(organisationName).then(
            ([response, json]) => {
                if (response.status === 200) {
                    this.setState({components: json});
                }
            }
        );
    };

    getTicketType = () => {
        ZenDeskApi.getType().then(([response, json]) => {
            if (response.status === 200) {
                this.setState({ticketTypes: json})
            } else {
                this.notify("Unable to get ticket types.")
            }
        })
    };

    getTicketPriority = () => {
        ZenDeskApi.getPriority().then(([response, json]) => {
            if (response.status === 200) {
                this.setState({ticketPriorities: json})
            } else {
                this.notify("Unable to get ticket priority.")
            }
        })
    };

    getTicket = () => {
        const {currentOrganisation} = this.props.context;
        let tags = [currentOrganisation.name];
        if (this.state.solution === "kunde-portal") {
            tags.push(this.state.solution);
        } else {
            tags.push(this.state.component)
        }


        return {
            comment: {
                body: this.state.description
            },
            priority: this.state.ticketPriority,
            requester_id: this.state.meSupportId,
            subject: this.state.shortDescription,
            submitter_id: this.state.meSupportId,
            tags: [...tags],
            type: this.state.ticketType
        }

    };

    submitTicket = () => {
        ZenDeskApi.createTicket(this.getTicket()).then((response) => {
            if (response.status === 202) {

                console.log(response.headers.get("location"));

                this.setState(
                    {
                        ticketStatusUrl: response.headers.get("location"), ticketSubmitted: true,
                    }
                );

                //this.notify("Saken er opprettet. Du vil få en epost.")
            } else {
                this.notify("Oisann, det gikk ikke helt etter planen. Prøv igjen :)")
            }
        })
    };

    componentDidMount() {
        const {currentOrganisation} = this.props.context;
        this.getOrganisationComponents(currentOrganisation.name);
        this.getTicketType();
        this.getTicketPriority()

        MeApi.getMe().then(([response, json]) => {
            if (response.status === 200) {
                console.log(json);
                this.setState({meSupportId: json.supportId})
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {currentOrganisation} = this.props.context;
        if (prevProps.context !== this.props.context) {
            //this.props.fetchClients(currentOrganisation.name);
            this.getOrganisationComponents(currentOrganisation.name);
        }
    }

    handleChange = e => {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    };

    disableComponentSelect = () => {
        return this.state.solution !== "felleskomponent";
    };

    renderSubmitted() {
        return (
            <ReactPolling
                url={this.state.ticketStatusUrl}
                interval={2000} // in milliseconds(ms)
                retryCount={5} // this is optional
                onSuccess={(response) => this.setState({newTicket: response})}
                onFailure={() => this.notify("Oisann! Vi fikk ikke til å opprette saken. Vennligst prøv igjen. ")} // this is optional
                method={'GET'}
                render={({startPolling, stopPolling, isPolling}) => {
                    if (isPolling) {
                        return (
                            <LoadingProgress/>
                        );
                    } else {
                        const {classes} = this.props;
                        return (
                            <div className={classes.root}>
                                <div className={classes.content}>
                                    <Typography variant="h5" className={classes.title}>
                                        Sak #{this.state.newTicket.id} er opprettet
                                    </Typography>
                                    Du vil få en epost med saksdetaljene. Videre oppfølging av saken skjer via epost.
                                </div>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            this.setState({ticketSubmitted: false});
                                            this.clearTicketForm();
                                        }}
                                    >
                                        Opprett ny sak
                                    </Button>
                                </div>
                            </div>
                        );
                    }
                }}
            />
        )
    }

    renderTicketForm() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AutoHideNotification
                    showNotification={this.state.notify}
                    message={this.state.notifyMessage}
                    onClose={this.onCloseNotification}
                />
                <div className={classes.content}>
                    <Typography variant="h5" className={classes.title}>
                        Opprett support sak
                    </Typography>
                    <Divider/>
                    <div className={classes.ticketForm}>

                        <RadioGroup
                            aria-label="Gender"
                            name="solution"
                            className={classes.group}
                            value={this.state.solution}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel value="kunde-portal" control={<Radio/>} label="Kunde portal"/>
                            <div className={classes.component}>
                                <FormControlLabel value="felleskomponent" control={<Radio/>} label="Felleskomponent"/>
                                <ComponentSelector
                                    disabled={this.disableComponentSelect()}
                                    components={this.state.components}
                                    handleChange={this.handleChange}
                                    name={"component"}
                                    value={this.state.component}
                                />
                            </div>

                        </RadioGroup>

                        <Box borderTop={1} borderBottom={1} pt={1} pb={1} borderColor="grey.400">
                            <OutlinedSelector
                                data={this.state.ticketTypes}
                                value={this.state.ticketType}
                                onChange={this.handleChange}
                                title="Type"
                                name="ticketType"
                            />

                            <OutlinedSelector
                                data={this.state.ticketPriorities}
                                value={this.state.ticketPriority}
                                onChange={this.handleChange}
                                title="Prioritet"
                                name="ticketPriority"
                            />
                        </Box>

                        <TextField
                            id="shortDescription"
                            name="shortDescription"
                            label="Kort beskrivelse"
                            value={this.state.shortDescription}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            id="description"
                            name="description"
                            label="Beskrivelse"
                            value={this.state.description}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={10}
                            fullWidth
                            required
                        />
                    </div>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.submitTicket}
                        >
                            Send inn sak
                        </Button>
                    </div>

                </div>
            </div>
        );
    }

    render() {
        if (this.state.ticketSubmitted) return this.renderSubmitted();
        //else return
        return this.renderTicketForm();
    }
}

SupportContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
};

export default withStyles(styles)(withContext(SupportContainer));