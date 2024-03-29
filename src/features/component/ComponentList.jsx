import React, {Component} from "react";
import { styled } from "@mui/material/styles";
import {
    Avatar,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ComponentIcon from "@mui/icons-material/WebAsset";
import OrganisationApi from "../../data/api/OrganisationApi";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import PropTypes from "prop-types";
import ComponentsView from "./ComponentsView";
import WarningMessageBox from "../../common/message-box/WarningMessageBox";
import InformationMessageBox from "../../common/message-box/InformationMessageBox";
import {withContext} from "../../data/context/withContext";
import OpenDataLabel from "../../common/label/OpenDataLabel";
import CommonComponentLabel from "../../common/label/CommonComponentLabel";
import RemoveButton from "../../common/button/RemoveButton";
import AddButton from "../../common/button/AddButton";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import Sort from "../../common/utils/Sort";

const PREFIX = 'ComponentList';

const classes = {
    root: `${PREFIX}-root`,
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
    [`&.${classes.root}`]: {
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

class ComponentList extends Component {
    askToLinkComponent = component => {
        this.setState({
            askLink: true,
            message:
                "Vil du legge til komponenten:  " +
                component.description +
                " til organisasjonen?",
            component: component
        });
    };
    askToUnLinkComponent = component => {
        this.setState({
            askUnLink: true,
            message:
                "Er du sikker på at du vil fjerne komponenten:  " +
                component.description +
                " fra organisasjonen?",
            component: component
        });
    };
    linkComponent = component => {
        const {context} = this.props;

        OrganisationApi.linkComponent(component, context.currentOrganisation.name)
            .then(responseApi => {
                this.setState({
                    notify: true,
                    notifyMessage: `${component.description} ble lagt til!`
                });
                context.refresh();
                this.props.fetchComponents();
            })
            .catch(error => {
                alert(error);
            });
    };
    unlinkComponent = component => {
        const {context} = this.props;

        OrganisationApi.unlinkComponent(component, context.currentOrganisation.name)
            .then(responseApi => {
                this.setState({
                    notify: true,
                    notifyMessage: `${component.description} ble fjernet!`
                });
                context.refresh();
                this.props.fetchComponents();
            })
            .catch(error => {
                alert(error);
            });
    };
    onCloseLink = confirmed => {
        this.setState({
            askLink: false
        });

        if (confirmed) {
            this.linkComponent(this.state.component);
        }
    };
    onCloseUnLink = confirmed => {
        this.setState({
            askUnLink: false
        });

        if (this.isLinkedToOrganisation(this.state.component) && confirmed) {
            this.unlinkComponent(this.state.component);
        }
    };
    onCloseNotification = () => {
        this.setState({
            notify: false,
            notifyMessage: ""
        });
    };
    showComponent = component => {
        this.setState({
            showComponent: true,
            component: component
        });
    };
    onCloseShowComponent = () => {
        this.setState({
            showComponent: false,
            component: null
        });
    };
    isLinkedToOrganisation = component => {
        let componentOrganisations = component.organisations;

        for (let i = 0; i < componentOrganisations.length; i++) {
            if (
                componentOrganisations[i].toLowerCase() ===
                this.props.organisation.dn.toLowerCase()
            ) {
                return true;
            }
        }
        return false;
    };

    renderAddRemove = component => {
        return (
            <React.Fragment>
                {this.isLinkedToOrganisation(component) ? (
                    <RemoveButton
                        class={"componentRemoveButton"}
                        onClick={() => this.askToUnLinkComponent(component)}
                        title="Fjerne komponent fra organisasjonen"
                    />
                ) : (
                    <AddButton
                        class={"componentAddButton"}
                        onClick={() => this.askToLinkComponent(component)}
                        title="Legge komponent til organisasjonen"
                    />
                )}
            </React.Fragment>
        );
    };

    constructor(props) {
        super(props);
        this.state = {
            askLink: false,
            askUnLink: false,
            message: "",
            component: null,
            notify: false,
            notifyMessage: "",
            showComponent: false
        };
    }

    render() {
        const { organisation} = this.props;
        const components = this.props.components.sort(Sort.alphabetically);

        return (
            <Root className={classes.root}>
                <WarningMessageBox
                    show={this.state.askUnLink}
                    message={this.state.message}
                    onClose={this.onCloseUnLink}
                />
                <InformationMessageBox
                    show={this.state.askLink}
                    message={this.state.message}
                    onClose={this.onCloseLink}
                />
                <AutoHideNotification
                    showNotification={this.state.notify}
                    message={this.state.notifyMessage}
                    onClose={this.onCloseNotification}
                />
                <ComponentsView
                    component={this.state.component}
                    show={this.state.showComponent}
                    onClose={this.onCloseShowComponent}
                />
                <div className={classes.componentList}>
                    <FeatureHelperText>
                        <p>En komponent er en løsning fra FINT.</p>
                        <p>
                            For at organisasjonen skal kunne ta i bruk en løsning fra FINT må
                            den legges til organisasjonen.
                        </p>
                        <p>
                            Komponenter som er merket Åpne Data/Felles kan ikke legges til. De
                            administreres av FINT.
                        </p>
                    </FeatureHelperText>
                    <Typography variant="h5" className={classes.title}>
                        Komponenter
                    </Typography>
                    <Divider/>
                    <List id={"componentList"}>
                        {components.map(component => (
                            <ListItem className={classes.listItem} key={component.dn}>
                                <ListItemAvatar>
                                    <Avatar className={classes.itemAvatar}>
                                        <ComponentIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={component.description}
                                    secondary={component.basePath}
                                />
                                <ListItemSecondaryAction>
                                    {component.openData && <OpenDataLabel/>}
                                    {component.common && <CommonComponentLabel/>}
                                    {(!component.openData ||
                                        !component.common ||
                                        organisation.name === "fintlabs_no") &&
                                    this.renderAddRemove(component)}
                                    <IconButton
                                        aria-label="Settings"
                                        onClick={() => this.showComponent(component)}
                                    >
                                        <SettingsIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Root>
        );
    }
}

ComponentList.propTypes = {
    classes: PropTypes.any,
    components: PropTypes.array.isRequired,
    fetchComponents: PropTypes.any.isRequired,
    organisation: PropTypes.any.isRequired
};

export default (withContext(ComponentList));
