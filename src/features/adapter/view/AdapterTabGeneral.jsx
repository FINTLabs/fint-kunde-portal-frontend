import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

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
