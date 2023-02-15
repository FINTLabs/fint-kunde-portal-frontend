import React from "react";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
    Grid,
    Typography
} from "@mui/material";
import PropTypes from "prop-types";

const PREFIX = 'UsernameValidationInput';

const classes = {
  realm: `${PREFIX}-realm`,
  label: `${PREFIX}-label`,
  input: `${PREFIX}-input`
};

const StyledFormControl = styled(FormControl)((
  {
    theme
  }
) => ({
  [`& .${classes.realm}`]: {
    width: "50%",
    display: "box",
    boxAlign: "center",
    fontSize: "1rem"
  },

  [`& .${classes.label}`]: {
    width: "50%",
    position: "inherit"
  },

  [`& .${classes.input}`]: {
    width: "50%"
  }
}));

class UsernameValidationInput extends React.Component {
  onChangeUsername = event => {
    let username = event.target.value;
    let usernameValidator = new RegExp("^[a-zA-Z0-9_-]{3,128}$");
    let valid = usernameValidator.test(username);

    this.setState({
      usernameValid: valid
    });

    this.props.usernameIsValid(valid);
    this.props.onChange(event);
  };

  constructor(props) {
    super(props);
    this.state = {
      usernameValid: true
    };
  }

  render() {
    const { name, title, realm, } = this.props;
    return (
      <StyledFormControl fullWidth error={!this.state.usernameValid} required>
        <InputLabel className={classes.label} htmlFor={name}>
          {title}
        </InputLabel>
        <Grid container>
          <Input
            autoFocus
            name={name}
            onChange={this.onChangeUsername}
            className={classes.input}
            id={"userNameInput"}
          />
          <Typography variant="caption" className={classes.realm}>
            {realm}
          </Typography>
        </Grid>

        <FormHelperText>
          {this.state.usernameValid
            ? ""
            : "Brukernavnet kan bare inneholde a-z, A-Z, 0-9, - og _. Det kan fra 3-128 tegn langt."}
        </FormHelperText>
      </StyledFormControl>
    );
  }
}

UsernameValidationInput.defaultProps = {
  realm: "@dummy.no"
};
UsernameValidationInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  realm: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  usernameIsValid: PropTypes.func.isRequired
};
export default (UsernameValidationInput);
