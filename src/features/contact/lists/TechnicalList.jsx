import React from "react";
import PropTypes from "prop-types";
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
    withStyles
} from "@material-ui/core";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import ContactIcon from "@material-ui/icons/Person";
import SetLegalIcon from "@material-ui/icons/AccountBalance";
import RolesIcon from "@material-ui/icons/LockOpenRounded";
import OrganisationApi from "../../../data/api/OrganisationApi";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import {withContext} from "../../../data/context/withContext";
import TooltipIconButton from "../../../common/button/TooltipIconButton";

const styles = theme => ({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    technicalContactList: {
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
        backgroundColor: theme.palette.secondary.light
    },
});

class TechnicalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            askToRemoveContact: false,
            contact: {},
            message: ""
        };
    }

    askToRemoveContact = contact => {
        this.setState({
            askToRemoveContact: true,
            message: `Er du sikker på at du vil fjerne ${contact.firstName} ${
                contact.lastName
            } fra organisasjonen?`,
            contact: contact
        });
    };

    onCloseRemoveContact = confirmed => {
        this.setState({
            askToRemoveContact: false
        });

        if (confirmed) {
            this.removeContact(this.state.contact);
        }
    };

    removeContact = contact => {
        OrganisationApi.removeTechnicalContact(
            contact,
            this.props.context.currentOrganisation.name
        )
            .then(response => {
                this.props.notify(
                    `${contact.firstName} ${contact.lastName} ble fjernet.`
                );
                this.props.fetchTechnicalContacts();
            })
            .catch(error => {
                alert(error);
            });
    };

    setLegalContact = contact => {
        OrganisationApi.unsetLegalContact(
            this.props.legalContact,
            this.props.context.currentOrganisation.name
        )
            .then(() => {
                OrganisationApi.setLegalContact(
                    contact,
                    this.props.context.currentOrganisation.name
                )
                    .then(() => {
                        this.props.notify("Juridisk ansvarlig er oppdatert.");
                        this.props.afterUpdateLegalContact();
                    })
                    .catch(() => {
                    });
            })
            .catch(() => {
            });
    };

    render() {
        const {classes, technicalContacts} = this.props;
        return (
            <div className={classes.root}>
                <WarningMessageBox
                    show={this.state.askToRemoveContact}
                    message={this.state.message}
                    onClose={this.onCloseRemoveContact}
                />
                <div className={classes.technicalContactList}>
                    <Typography variant="h5" className={classes.title}>
                        Teknisk kontakter
                    </Typography>
                    <Divider/>
                    <List id={"technicalContactsList"}>
                        {technicalContacts.map(contact => (
                            <ListItem className={classes.listItem} key={contact.dn}>
                                <ListItemAvatar>
                                    <Avatar className={classes.itemAvatar}>
                                        <ContactIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${contact.firstName} ${contact.lastName}`}
                                    secondary=""
                                />
                                <ListItemSecondaryAction>
                                    <TooltipIconButton
                                        ariaLabel="Roles"
                                        onClick={() => {
                                        }}
                                        id="manageRoles"
                                        toolTip="Administrer roller for kontakten"
                                    >
                                        <RolesIcon/>
                                    </TooltipIconButton>

                                    <TooltipIconButton
                                        ariaLabel="Juridisk kontakt"
                                        onClick={() => this.setLegalContact(contact)}
                                        id="changeLegalButton"
                                        toolTip="Angi som juridisk kontakt"
                                    >
                                        <SetLegalIcon/>
                                    </TooltipIconButton>

                                    <TooltipIconButton
                                        ariaLabel="Fjern kontakt"
                                        onClick={() => this.askToRemoveContact(contact)}
                                        id="removeUserButton"
                                        toolTip="Fjern teknisk kontakt"
                                    >
                                        <RemoveIcon/>
                                    </TooltipIconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}

TechnicalList.propTypes = {
    afterUpdateLegalContact: PropTypes.any.isRequired,
    classes: PropTypes.any.isRequired,
    fetchTechnicalContacts: PropTypes.any.isRequired,
    notify: PropTypes.any.isRequired,
    technicalContacts: PropTypes.array.isRequired
};
export default withStyles(styles)(withContext(TechnicalList));
