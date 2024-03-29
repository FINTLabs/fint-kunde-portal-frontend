import React from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@mui/material";

import PropTypes from "prop-types";


class AssetNameValidationInput extends React.Component {
  onChangeUsername = event => {
    let username = event.target.value;
    let assetNameValidator = new RegExp("[^a-z.]|\\.\\.|\\.$|^\\.");
    let valid = !assetNameValidator.test(username);

    this.setState({
      assetNameValid: valid
    });

    this.props.assetNameIsValid(valid);
    this.props.onChange(event);
  };

  constructor(props) {
    super(props);
    this.state = {
      assetNameValid: true
    };
  }

  render() {
    const { name, title, className } = this.props;
    return (
      <FormControl
          sx={{width:"55%"}}
          error={!this.state.assetNameValid}
          className={className}
          required
      >
        <InputLabel htmlFor={name}>{title}</InputLabel>
        <Input
          autoFocus
          fullWidth
          name={name}
          onChange={this.onChangeUsername}
          id={"name"}
        />
        <FormHelperText>
          {this.state.assetNameValid
            ? ""
            : "Ressursnavnet kan bare inneholde a-z og . (punktum). Det kan fra 1-128 tegn langt."}
        </FormHelperText>
      </FormControl>
    );
  }
}

AssetNameValidationInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  assetNameIsValid: PropTypes.func.isRequired
};
export default AssetNameValidationInput;
