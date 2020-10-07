import React from "react";
import {FormControl, FormHelperText, Input, InputLabel, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    realm: {
        width: "50%",
        display: "box",
        boxAlign: "center",
        fontSize: "1rem"
    },
    label: {
        width: "50%",
        position: "inherit"
    },
    input: {
        width: "50%"
    }
});

class PackageIdValidationInput extends React.Component {
    onChangeUsername = event => {
        let username = event.target.value;
        let usernameValidator = new RegExp("^[a-zA-Z0-9_-]{3,128}$");
        const packages = this.props.packages;
        let valid = usernameValidator.test(username) && matchOtherPackage(username);
        let mathedOther = matchOtherPackage(username);

        function matchOtherPackage(username) {
        let match = false;
            packages.map(ap => {
                if (ap.name === username){
                    match = true;
                }
                return ap;
            });
            return !match;
        }

        this.setState({
            usernameValid: valid,
            nameMatchedOther: mathedOther,
        });

        this.props.packageNameIsValid(valid);
        if (valid){
            this.props.onChange(username);
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            usernameValid: true,
            nameMatchedOther:false,
        };
    }

    render() {
        const { name, title, realm, classes } = this.props;
        return (
            <FormControl fullWidth error={!this.state.usernameValid} required>
                <InputLabel className={classes.label} htmlFor={name}>
                    {title}
                </InputLabel>
                <Grid container>
                    <Input
                        autoFocus
                        name={name}
                        onChange={this.onChangeUsername}
                        className={classes.input}
                    />
                    <Typography variant="caption" className={classes.realm}>
                        {realm}
                    </Typography>
                </Grid>

                <FormHelperText>
                    {this.state.usernameValid
                        ? ""
                        : !this.state.nameMatchedOther ? "Navn er brukt i en annen tilgangspakke" :"Pakkenavn kan bare inneholde a-z, A-Z, 0-9, - og _. Det kan fra 3-128 tegn langt."}
                </FormHelperText>
            </FormControl>
        );
    }
}

PackageIdValidationInput.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    packageNameIsValid: PropTypes.func.isRequired,
    packages: PropTypes.array.isRequired
};
export default withStyles(styles)(PackageIdValidationInput);
