import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

class TabContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Typography
        component="div"
        style={{ padding: 8 * 3 }}
      >
        {this.props.children}
      </Typography>
    );
  }
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default TabContainer;
