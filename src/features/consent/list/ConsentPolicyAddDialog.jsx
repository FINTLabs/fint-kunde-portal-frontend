import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Select,
    InputLabel,
    FormControl,
    OutlinedInput,
    MenuItem
} from "@mui/material";

class ConsentPolicyAddDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reasonId: null,
            personalDataId:null,
            formal:null,
        };
    }

    handleChange = e => {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    };

    handleAddPolicy = () => {
            this.props.createPolicy(this.props.selectedService.id, this.state.reasonId, this.state.personalDataId, this.state.formal, this.props.currentOrg)
            .then(() => {
                this.props.notify(
                    // `Ressursen '${this.state.asset.description}' ble lagt til!`
                    "Ny behandling er lagret"
                );
                // this.props.fetchAssets(this.props.context.currentOrganisation.name);

                this.props.onClose();
            });
    };

    formIsValid = () => {
        return (
            this.state.reasonId &&
            this.state.reasonId !== "" &&
            this.state.personalDataId  &&
            this.state.personalDataId !== "" &&
            this.state.formal !== ""
        );
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.show}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        Legg til: {this.props.selectedService?this.props.selectedService.name:""}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Vennligst fyll ut de obligatoriske feltene for å legge til en ny
                            behandling.
                        </DialogContentText>

                            <FormControl
                                id={"personaldataFormControl"}
                                variant="outlined"
                                fullWidth
                                margin={"normal"}
                            >
                            <InputLabel>Personopplysning</InputLabel>

                                <Select
                                    name={"personalDataId"}
                                    onChange={this.handleChange}
                                    value={this.state.personalDataId || ""}
                                    input={
                                        <OutlinedInput
                                            label={"Personopplysning"}
                                            id={"personaldataFormControl"}
                                        />
                                    }
                                >
                                    <MenuItem value="">None</MenuItem> {/* Blank option */}
                                {this.props.personaldata?.map(x => {
                                    return (
                                        <MenuItem value={x.id} key={x.id} >
                                            {x.kode}: {x.navn} {x.id}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <FormControl
                            id={"policyFormControl"}
                            variant="outlined"
                            fullWidth
                            margin={"normal"}
                        >
                            <InputLabel>Behandlingsgrunnlag</InputLabel>
                            <Select
                                name={"reasonId"}
                                onChange={this.handleChange}
                                value={this.state.reasonId || ""}
                                input={
                                    <OutlinedInput
                                        label={"Behandlingsgrunnlag"}
                                        id={"policyFormControl"}
                                    />
                                }
                            >
                                <MenuItem value="">None</MenuItem> {/* Blank option */}
                                {this.props.policypurpose?.map(x => {
                                    return (
                                        <MenuItem value={x.id} key={x.id}>
                                            {x.kode}: {x.navn} {x.id}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            name="formal"
                            label="Formål"
                            required
                            fullWidth
                            multiline
                            rows={2}
                            onChange={this.handleChange}
                        />

                    </DialogContent>
                    <DialogActions>

                        <Button
                            onClick={this.props.onClose}
                            variant="contained"
                            color="primary"
                            name={"close"}
                        >
                            Avbryt
                        </Button>
                        <Button
                            onClick={this.handleAddPolicy}
                            variant="contained"
                            color="primary"
                            name={"add"}
                            disabled={!this.formIsValid()}
                        >
                            Legg til
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}



ConsentPolicyAddDialog.defaultProps = {
    show: false,
    currentOrg: null,
};
/* TODO: set up parameters here
ConsentPolicyAddDialog.propTypes = {
    orgId: PropTypes.string,
    setLoading: PropTypes.func.isRequired,
};*/


export default ConsentPolicyAddDialog;
