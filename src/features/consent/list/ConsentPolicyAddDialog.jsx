import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";

class ConsentPolicyAddDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reasonId: null,
            personalDataId:null,
            description:null,
        };
    }

    handleChange = e => {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    };

    handleAddPolicy = () => {

            this.props.createPolicy(this.props.selectedService.systemId, this.state.reasonId, this.state.personalDataId, this.state.description)
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
        return (this.state.reasonId && this.state.personalDataId, this.state.description);
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
                                    input={
                                        <OutlinedInput
                                            label={"Personopplysning"}
                                            id={"personaldataFormControl"}
                                        />
                                    }
                                >

                                {this.props.personaldata.map(x => {
                                    return (
                                        <MenuItem value={x.systemId} key={x.systemId} >
                                            {x.code}: {x.name}
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
                                input={
                                    <OutlinedInput
                                        label={"Behandlingsgrunnlag"}
                                        id={"policyFormControl"}
                                    />
                                }
                            >
                                {this.props.policypurpose.map(x => {
                                    return (
                                        <MenuItem value={x.systemId} key={x.systemId}>
                                            {x.code}: {x.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            name="description"
                            label="Description"
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
};
/* TODO: set up parameters here
ConsentPolicyAddDialog.propTypes = {
    orgId: PropTypes.string,
    setLoading: PropTypes.func.isRequired,
};*/


export default ConsentPolicyAddDialog;
