import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import classNames from "classnames";
import { CircularProgress, Fab } from '@mui/material';
import RunIcon from "@mui/icons-material/PlayArrow";
import green from "@mui/material/colors/green";


const PREFIX = 'BasicTestRunButton';

const classes = {
  root: `${PREFIX}-root`,
  wrapper: `${PREFIX}-wrapper`,
  buttonSuccess: `${PREFIX}-buttonSuccess`,
  fabProgress: `${PREFIX}-fabProgress`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    alignItems: "center",
    float: "right"
  },

  [`& .${classes.wrapper}`]: {
    margin: theme.spacing(1),
    position: "relative"
  },

  [`& .${classes.buttonSuccess}`]: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },

  [`& .${classes.fabProgress}`]: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  }
  /*
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  */
}));

class BasicTestRunButton extends React.Component {
  timer = null;

  state = {
    loading: false,
    success: true
  };

  render() {
    const { loading, success } = this.props;
    const { } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    return (
      <Root className={classes.root}>
        <div className={classes.wrapper}>
          <Fab
            color="primary"
            className={buttonClassname}
            onClick={this.props.onClick}
            disabled={this.props.disabled || loading}
            id={"runBasisTestButton"}
          >
            <RunIcon />
          </Fab>
          {loading && (
            <CircularProgress size={68} className={classes.fabProgress} />
          )}
        </div>
      </Root>
    );
  }
}

BasicTestRunButton.propTypes = {
  classes: PropTypes.object
};

export default (BasicTestRunButton);
