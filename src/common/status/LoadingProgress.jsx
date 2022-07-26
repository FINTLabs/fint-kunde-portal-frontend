import PropTypes from "prop-types";
import React from "react";
import { CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';

const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
  position: "absolute",
  top: "30%",
  left: "50%",
  marginRight: "-50%"
}));


class LoadingProgress extends React.Component {
  render() {
    const { color, size } = this.props;

    return (
      <CustomCircularProgress
        color={color}
        size={size}
      />
    );
  }
}

LoadingProgress.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  size: PropTypes.number
};

LoadingProgress.defaultProps = {
  color: "primary",
  size: 125
};

export default (LoadingProgress);
