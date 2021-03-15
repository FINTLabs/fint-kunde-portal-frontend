import React from "react";
import TechnicalList from "./lists/TechnicalList";
import PropTypes from "prop-types";
import LegalList from "./lists/LegalList";

function ContactList(props) {
    const {legalContact, technicalContacts} = props;
    return (
        <div>

            <LegalList
                legalContact={legalContact}
                notify={props.notify}
            />
            <TechnicalList technicalContacts={technicalContacts}
                           fetchTechnicalContacts={props.fetchTechnicalContacts}
                           afterUpdateLegalContact={props.afterUpdateLegalContact}
                           notify={props.notify}
                           legalContact={legalContact}
            />
        </div>
    );
}

ContactList.propTypes = {
    fetchTechnicalContacts: PropTypes.any.isRequired,
    legalContact: PropTypes.object.isRequired,
    notify: PropTypes.any.isRequired,
    technicalContacts: PropTypes.array.isRequired,
    afterUpdateLegalContact: PropTypes.func.isRequired
};

export default ContactList;
