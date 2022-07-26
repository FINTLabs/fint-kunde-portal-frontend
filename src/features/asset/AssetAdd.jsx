import React from "react";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Add } from "@mui/icons-material";
import { withContext } from "../../data/context/withContext";
import AssetNameValidationInput from "../../common/input-validation/AssetNameValidationInput";

const PREFIX = 'AssetAdd';

const classes = {
  addButton: `${PREFIX}-addButton`,
  assetName: `${PREFIX}-assetName`,
  primaryAssetId: `${PREFIX}-primaryAssetId`,
  dialog: `${PREFIX}-dialog`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.addButton}`]: {
    margin: 0,
    top: 100,
    left: "auto",
    bottom: "auto",
    right: 50,
    position: "fixed"
  },

  [`& .${classes.assetName}`]: {
    width: "55%"
  },

  [`& .${classes.primaryAssetId}`]: {
    width: "45%"
  },

  [`& .${classes.dialog}`]: {
    //width: '50%',
  }
}));

class AssetAdd extends React.Component {
  updateAssetState = event => {
    const field = event.target.name;
    const asset = this.state.asset;
    asset[field] = event.target.value;
    return this.setState({ asset: asset });
  };

  handleAddAsset = () => {
    this.props
      .createAsset(this.state.asset, this.props.organisation)
      .then(() => {
        this.props.notify(
          `Ressursen '${this.state.asset.description}' ble lagt til!`
        );
        this.props.fetchAssets(this.props.context.currentOrganisation.name);
        this.setState({
          showAssetAdd: false,
          asset: this.getEmptyAsset(),
          assetAdded: true
        });
      });
  };

  usernameIsValid = valid => {
    this.setState({ usernameIsValid: valid });
  };

  openAddDialog = () => {
    this.setState({ showAssetAdd: true, notify: false });
  };

  handleCancel = () => {
    this.setState({ showAssetAdd: false, notify: false });
  };

  getEmptyAsset = () => {
    return {
      name: "",
      description: ""
    };
  };

  nameIsValid = valid => {
    this.setState({ nameIsValid: valid });
  };

  isFormValid = () => {
    return this.state.nameIsValid && this.state.asset.description.length > 0;
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      asset: this.getEmptyAsset(),
      showAssetAdd: false,
      assetAdded: false,
      usernameIsValid: false
    };
  }

  componentDidUpdate(prevState) {
    if (prevState.assetAdded === true) {
      this.props.fetchAssets(this.props.organisation.name);
    }
  }

  render() {
    const { } = this.props;
    return (
      <Root>
        <div>
          <Fab
            color="secondary"
            className={classes.addButton}
            onClick={this.openAddDialog}
            id={"assetAddFAB"}
          >
            <Add />
          </Fab>
          <Dialog
            open={this.state.showAssetAdd}
            onClose={this.handleAddAsset}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
            className={classes.dialog}
          >
            <DialogTitle id="form-dialog-title">Ny ressurs</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vennligst fyll ut de obligatoriske feltene for å legge til ny
                ressurs.
              </DialogContentText>
              <AssetNameValidationInput
                className={classes.assetName}
                name="name"
                title="Navn (f.eks. las eller skole.las)"
                onChange={this.updateAssetState}
                assetNameIsValid={this.nameIsValid}
              />
              <TextField
                className={classes.primaryAssetId}
                label={`.${this.props.primaryAssetId}`}
                disabled
                InputProps={{
                  disableUnderline: true
                }}
              />
              <TextField
                name="description"
                label="Beskrivelse"
                required
                fullWidth
                onChange={this.updateAssetState}
                id={"description"}
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCancel}
                variant="contained"
                color="primary"
              >
                Avbryt
              </Button>
              <Button
                disabled={!this.isFormValid()}
                onClick={this.handleAddAsset}
                variant="contained"
                color="primary"
                id={"addNewAssetButton"}
              >
                Legg til
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Root>
    );
  }
}

AssetAdd.propTypes = {};

export default (withContext(AssetAdd));
