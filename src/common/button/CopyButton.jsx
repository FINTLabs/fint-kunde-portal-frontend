import { IconButton } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import React from "react";

class CopyButton extends React.Component {
  render() {
    return (
      <IconButton>
        <ContentCopy />
      </IconButton>
    );
  }
}

export default CopyButton;
