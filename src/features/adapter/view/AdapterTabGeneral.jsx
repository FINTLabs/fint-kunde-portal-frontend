import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

class AdapterTabGeneral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <TextField
          autoFocus
          name="shortDescription"
          label="Kort beskrivelse"
          fullWidth
          onChange={this.props.updateAdapterState}
          value={this.props.adapter.shortDescription}
          id={"shortDescriptionTextField"}
          variant="standard"
        />
        <TextField
          name="note"
          label="Note"
          multiline
          rows="4"
          onChange={this.props.updateAdapterState}
          value={this.props.adapter.note}
          fullWidth
          id={"noteTextField"}
          variant="standard"
        />
      </div>
    );
  }
}

AdapterTabGeneral.propTypes = {
  adapter: PropTypes.object.isRequired,
  updateAdapterState: PropTypes.func.isRequired
};

export default AdapterTabGeneral;
