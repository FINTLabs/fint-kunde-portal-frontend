import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from "@material-ui/core";

import {TextField} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {behandlingsgrunnlag, personopplysning} from "./data";
import FormControl from "@material-ui/core/FormControl";

class ConsentPolicyAdd extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    onClose = () => {
        console.log('close from add dialog');
        // this.props.onClose();
    };


    addNewPolicy = () => {
        console.log('new policy from add');
        this.props.onClose();
    };

    render() {
        return (
            <div>

                <Dialog
                    open={this.props.showAddPolicyDialog}
                    onClose={this.onClose}
                    aria-labelledby="form-dialog-title"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        name goes here {this.props.selectedService}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Vennligst fyll ut de obligatoriske feltene for å legge til en ny
                            samtykke thing TODO.
                        </DialogContentText>

                        <FormControl id={"serviceFormControl"}>
                            <InputLabel>Personopplysning</InputLabel>
                            <Select
                                native
                                id={"componentSelector"}
                                // value={value}
                                // onChange={props.handleChange}
                            >
                                <option>Please Choose</option>
                                {personopplysning.map(x => {
                                    return (
                                        <option value={x.id} key={x.id}>
                                            {x.code}: {x.name}
                                        </option>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <FormControl  id={"serviceFormControl"}>
                            <InputLabel>Behandlingsgrunnlag</InputLabel>
                            <Select
                                native
                                id={"componentSelector"}
                                // value={value}
                                // onChange={props.handleChange}
                            >
                                <option>Please choose</option>
                                {behandlingsgrunnlag.map(x => {
                                    return (
                                        <option value={x.id} key={x.id}>
                                            {x.code}: {x.name}
                                        </option>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            name="Description"
                            label="Description"
                            required
                            fullWidth
                            multiline
                            rows={2}
                        />

                    </DialogContent>
                    <DialogActions>

                        <Button
                            onClick={this.onClose}
                            variant="contained"
                            color="primary"
                        >
                            Avbryt
                        </Button>
                        <Button
                            onClick={this.addNewPolicy}
                            variant="contained"
                            color="primary"
                        >
                            Add New Service
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}



ConsentPolicyAdd.defaultProps = {
    showAddPolicyDialog: false,
};
/* TODO: set up parameters here
ConsentPolicyAdd.propTypes = {
    orgId: PropTypes.string,
    setLoading: PropTypes.func.isRequired,
};*/

export default  ConsentPolicyAdd;