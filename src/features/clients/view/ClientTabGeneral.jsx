import React from "react";
import PropTypes from "prop-types";
import {TextField} from "@material-ui/core";

function ClientTabGeneral(props) {
    return (
        <div>
            <TextField
                autoFocus
                name="shortDescription"
                label="Kort beskrivelse"
                fullWidth
                onChange={props.updateClientState}
                value={props.client.shortDescription}
            />
            <TextField
                name="note"
                label="Note"
                multiline
                rows="10"
                onChange={props.updateClientState}
                value={props.client.note}
                fullWidth
            />
        </div>
    );
}

ClientTabGeneral.propTypes = {
  client: PropTypes.object.isRequired,
  updateClientState: PropTypes.func.isRequired
};

export default ClientTabGeneral;
