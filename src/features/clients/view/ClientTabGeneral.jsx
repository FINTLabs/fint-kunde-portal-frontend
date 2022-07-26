import React from "react";
import PropTypes from "prop-types";
import {TextField} from "@mui/material";

function ClientTabGeneral(props) {
    return (
        <div>
            <TextField
                variant="standard"
                autoFocus
                name="shortDescription"
                label="Kort beskrivelse"
                fullWidth
                onChange={props.updateClientState}
                value={props.client.shortDescription}
                id={"shortDescriptionTextField"}
            />
            <TextField
                variant="standard"
                name="note"
                label="Note"
                multiline
                rows="10"
                onChange={props.updateClientState}
                value={props.client.note}
                fullWidth
                id={"noteTextField"}
            />
        </div>
    );
}

ClientTabGeneral.propTypes = {
  client: PropTypes.object.isRequired,
  updateClientState: PropTypes.func.isRequired
};

export default ClientTabGeneral;
