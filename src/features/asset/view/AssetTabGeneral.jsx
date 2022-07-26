import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
const PREFIX = 'AssetTabGeneral';

const classes = {
  primaryAsset: `${PREFIX}-primaryAsset`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.primaryAsset}`]: {
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

class AssetTabGeneral extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { } = this.props;

    return (
      <Root>
        {this.props.asset.primaryAsset === true && (
          <div className={classes.primaryAsset}>PRIMÆR RESSURS</div>
        )}
        <TextField
          name="assetId"
          label="RessursID"
          onChange={this.props.updateAssetState}
          value={this.props.asset.assetId}
          disabled
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          name="description"
          label="Beskrivelse"
          fullWidth
          onChange={this.props.updateAssetState}
          value={this.props.asset.description}
          id={"assetDescriptionTextField"}
          variant="standard"
        />
        <TextField
          name="name"
          label="Navn"
          onChange={this.props.updateAssetState}
          value={this.props.asset.name}
          disabled
          fullWidth
          variant="standard"
        />
      </Root>
    );
  }
}

AssetTabGeneral.propTypes = {
  asset: PropTypes.object.isRequired,
  updateAssetState: PropTypes.func.isRequired
};

export default (AssetTabGeneral);
