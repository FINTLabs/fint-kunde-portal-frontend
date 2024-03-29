import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import LoadingProgress from "../../common/status/LoadingProgress";
import {fetchLegalContact, fetchTechnicalContacts} from "../../data/redux/dispatchers/organisation";
import ContactList from "./ContactList";
import ContactAdd from "./add/ContactAddExisting";
import {fetchContacts} from "../../data/redux/dispatchers/contact";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import PropTypes from "prop-types";
import {withContext} from "../../data/context/withContext";

class ContactContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            technicalContacts: this.props.technicalContacts,
            notify: false,
            notifyMessage: ""
        };
    }

    componentDidMount() {
        this.fetchTechnicalContacts();
        this.fetchLegalContact();
        this.props.fetchContacts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.context !== this.props.context) {
            this.fetchTechnicalContacts();
            this.fetchLegalContact();
            this.props.fetchContacts();
        }
    }

    fetchTechnicalContacts = () => {
        return this.props.fetchTechnicalContacts(
            this.props.context.currentOrganisation.name
        );
    };

    fetchLegalContact = () => {
        this.props.fetchLegalContact(this.props.context.currentOrganisation.name);
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

    getSelectableContacts = () => {
        if (this.props.contacts) {
            return this.props.contacts.filter(c => {
                return this.props.technicalContacts.every(tc => {
                    return tc.nin !== c.nin;
                });
            });
        }
        return [];
    };

    afterUpdateLegalContact = () => {
        this.fetchTechnicalContacts();
        this.fetchLegalContact();
    };

    render() {
        if (
            this.props.technicalContacts === undefined ||
            this.props.legalContact === undefined ||
            this.props.contacts === undefined
        ) {
            return <LoadingProgress/>;
        } else {
            return this.renderPosts();
        }
    }

    renderPosts() {
        const { legalContact, technicalContacts} = this.props;
        return (
            <div>
                <AutoHideNotification
                    showNotification={this.state.notify}
                    message={this.state.notifyMessage}
                    onClose={this.onCloseNotification}
                />
                <ContactList
                    technicalContacts={technicalContacts}
                    legalContact={legalContact}
                    fetchTechnicalContacts={this.fetchTechnicalContacts}
                    afterUpdateLegalContact={this.afterUpdateLegalContact}
                    notify={this.notify}
                />
                <ContactAdd
                    contacts={this.getSelectableContacts()}
                    fetchTechnicalContacts={this.fetchTechnicalContacts}
                    fetchContacts={this.props.fetchContacts}
                    notify={this.notify}
                />
            </div>
        );
    }
}

ContactContainer.propTypes = {
    classes: PropTypes.any,
    contacts: PropTypes.any,
    fetchContacts: PropTypes.any,
    fetchLegalContact: PropTypes.any,
    fetchTechnicalContacts: PropTypes.any,
    legalContact: PropTypes.any,
    technicalContacts: PropTypes.any,
};

function mapStateToProps(state) {
    return {
        technicalContacts: state.organisation.technicalContacts,
        legalContact: state.organisation.legalContact,
        contacts: state.contact.contacts,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchTechnicalContacts: fetchTechnicalContacts,
            fetchLegalContact: fetchLegalContact,
            fetchContacts: fetchContacts,
        },
        dispatch
    );
}

export default (
    connect(
        mapStateToProps,
        matchDispatchToProps
    )(withContext(ContactContainer))
);
