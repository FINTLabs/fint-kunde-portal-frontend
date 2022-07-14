import React, {useContext} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from "@mui/material/Dialog";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AccessApi from "../../../data/api/AccessApi";
import {fetchAccess} from "../../../data/redux/dispatchers/access_package";
import AppContext from "../../../data/context/AppContext";
import {useDispatch, useSelector} from "react-redux";
import ChangedAccesses from "./ChangedAccesses";
import ChangedClients from "./ChangedClients";
import ChangedComponents from "./ChangedComponents";

const ConfirmAccessPackageUpdate = (props) => {
    const {open, handleClose, setEditOpen, setSnackBarOpen, setSnackBarMessage} = props;
    const oldAccessPackage = useSelector(state => state.access_package.selectedAccessPackageBeforeEdit);
    const context = useContext(AppContext);
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const selectedForEditingId = useSelector(state => state.access_package.selectedForEditing);
    const dispatch = useDispatch();

    let selectedAccessPackage = undefined;
    accessPackages.map(ap => {
        if (ap.dn === selectedForEditingId) {
            selectedAccessPackage = ap;
        }
        return ap;
    });

    function handleSave() {
        AccessApi.updateAccess(selectedAccessPackage, context.currentOrganisation.name)
            .then(response => {
                if (response.status === 200) {
                    setEditOpen(false);
                    dispatch(fetchAccess(context.currentOrganisation.name));
                    setSnackBarMessage(selectedAccessPackage.name + " lagret");
                    setSnackBarOpen(true);
                    handleClose();
                } else {
                    setEditOpen(false);
                    dispatch(fetchAccess(context.currentOrganisation.name));
                    setSnackBarMessage("Noe gikk galt: " + response.status + " " + response.statusText);
                    setSnackBarOpen(true);
                    handleClose();
                }
            });
    }

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> Følgende endringer blir utført
                    på {selectedAccessPackage.name}</DialogTitle>
                <DialogContent>
                    {<ChangedComponents oldAccessPackage={oldAccessPackage} newAccessPackage={selectedAccessPackage}/>}
                    {<ChangedAccesses oldAccessPackage={oldAccessPackage} newAccessPackage={selectedAccessPackage}/>}
                    {<ChangedClients oldAccessPackage={oldAccessPackage} newAccessPackage={selectedAccessPackage}/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant={"contained"}>
                        Tilbake
                    </Button>
                    <Button onClick={handleSave} color="primary" autoFocus variant={"contained"}>
                        Lagre
                    </Button>
                </DialogActions>
            </Dialog>
        );
};

export default ConfirmAccessPackageUpdate;
