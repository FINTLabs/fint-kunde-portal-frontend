import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import React, {Component} from "react";
import Button from "../../../node_modules/@mui/material/Button/Button";
import FintLogo from "../../images/fint-by-vigo.svg";
import Box from "@mui/material/Box";

const PREFIX = 'NoGoMessage';

const classes = {
    logo: `${PREFIX}-logo`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.logo}`]: {
        marginBottom: theme.spacing(2),
        //height: "25%",
        width: 178
    }
}));

class NoGoMessage extends Component {
    render() {
        // const {classes} = this.props;
        return (
            (<Root>
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
            </Root>)
        );
    }
}

NoGoMessage.propTypes = {
    buttonTitle: PropTypes.string.isRequired,
    classes: PropTypes.object,
    gotoUrl: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default (NoGoMessage);
