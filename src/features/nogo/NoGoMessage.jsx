import PropTypes from "prop-types";
import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import Button from "../../../node_modules/@material-ui/core/Button/Button";
import FintLogo from "../../images/fint-by-vigo.svg";
import Box from "@material-ui/core/Box";

const styles = theme => ({

    logo: {
        marginBottom: theme.spacing(2),
        height: "25%",
        width: "25%"
    }
});

class NoGoMessage extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
                <Box display="flex" flexDirection="column"  m={4} alignItems="center">
                    <img src={FintLogo} alt="logo" className={classes.logo}/>
                    <Box>
                        {this.props.message}
                    </Box>
                </Box>
                <Button
                    href={this.props.gotoUrl}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                >
                    {this.props.buttonTitle}
                </Button>
            </>
        );
    }
}

NoGoMessage.propTypes = {
    buttonTitle: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    gotoUrl: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default withStyles(styles)(NoGoMessage);
