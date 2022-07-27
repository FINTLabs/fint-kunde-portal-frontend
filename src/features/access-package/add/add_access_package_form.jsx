import React, {useContext, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,TextField,Button} from "@mui/material";
import PackageNameValidationInput from "../../../common/input-validation/PackageIdValidationInput";
import AccessApi from "../../../data/api/AccessApi";
import {fetchAccess} from "../../../data/redux/dispatchers/access_package";
import AppContext from "../../../data/context/AppContext";
import {useDispatch} from "react-redux";

const AddAccessPackageForm = (props) => {
    const {closeAddAccessPackage, packageNameIsValid, packages, valid, open, setOpen} = props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const context = useContext(AppContext);

    function updateName(name) {
        setName(name);
    }

    function updateDescription(event) {
        setDescription(event.target.value);
    }

    function handleCreatePackage() {
        const access = {};
        access.name = name;
        access.description = description;
        AccessApi.setAccess(access, context.currentOrganisation.name)
            .then(response => {
                if (response.status === 201) {
                    setOpen(false);
                    dispatch(fetchAccess(context.currentOrganisation.name));
                }
            });
    }

    return (
        <Dialog
            open={open}
            onClose={closeAddAccessPackage}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
        >
            <DialogTitle id="form-dialog-title">Ny tilgangspakke</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Vennligst fyll ut de obligatoriske feltene for å legge til ny
                    tilgangspakke.
                </DialogContentText>
                <PackageNameValidationInput
                    title="Navn"
                    name="name"
                    value={name}
                    onChange={updateName}
                    packageNameIsValid={packageNameIsValid}
                    packages={packages}
                />
                <TextField
                    name="description"
                    label="Beskrivelse"
                    required
                    fullWidth
                    value={description}
                    onChange={updateDescription}
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={closeAddAccessPackage}
                    variant="contained"
                    color="primary"
                >
                    Avbryt
                </Button>
                <Button
                    disabled={!valid}
                    onClick={handleCreatePackage}
                    variant="contained"
                    color="primary"
                >
                    Legg til
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAccessPackageForm;