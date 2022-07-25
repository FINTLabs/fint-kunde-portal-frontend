import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import { Tooltip, CircularProgress } from "@mui/material";
const PREFIX = 'TrafficLight';

const classes = {
  failed: `${PREFIX}-failed`,
  ok: `${PREFIX}-ok`,
  partiallyFailed: `${PREFIX}-partiallyFailed`,
  progress: `${PREFIX}-progress`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.failed}`]: {
    height: "25px",
    width: "25px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    display: "inline-block",
    webkitBoxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    mozBoxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    boxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)"
  },

  [`& .${classes.ok}`]: {
    height: "25px",
    width: "25px",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "50%",
    display: "inline-block",
    webkitBoxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    mozBoxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    boxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)"
  },

  [`& .${classes.partiallyFailed}`]: {
    height: "25px",
    width: "25px",
    backgroundColor: "#ff9800",
    borderRadius: "50%",
    display: "inline-block",
    webkitBoxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    mozBoxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    boxShadow:
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)"
  },

  [`& .${classes.progress}`]: {}
}));

class TrafficLight extends Component {
  getColor = () => {
    const { status, } = this.props;

    if (status === "OK") return classes.ok;
    if (status === "FAILED") return classes.failed;
    if (status === "PARTIALLY_FAILED") return classes.partiallyFailed;
  };

  render() {
    const { status, } = this.props;
    return (
      <Root id={"basisTestTooltip"}>
        <Tooltip title={status} placement="right" >
          {status === "RUNNING" ? (
            <CircularProgress
              className={classes.progress}
              size={30}
              color="secondary"
            />
          ) : (
            <span className={this.getColor()} />
          )}
        </Tooltip>
      </Root>
    );
  }
}

TrafficLight.propTypes = {};

export default (TrafficLight);
