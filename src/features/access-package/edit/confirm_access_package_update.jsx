import React, {useContext} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AccessApi from "../../../data/api/AccessApi";
import {fetchAccess} from "../../../data/redux/dispatchers/access_package";
import AppContext from "../../../data/context/AppContext";
import {useDispatch, useSelector} from "react-redux";
import ChangedAccesses from "./changed_accesses";
import ChangedClients from "./changed_clients";

const ConfirmAccessPackageUpdate = (props) => {
    const {open, handleClose, setEditOpen} = props;
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
            <DialogTitle id="alert-dialog-title"> Følgende endringer blir utført på {selectedAccessPackage.name}</DialogTitle>
            <DialogContent>
                    {<ChangedAccesses oldAccessPackage={oldAccessPackage} newAccessPackage={selectedAccessPackage}/>}
                    {<ChangedClients oldAccessPackage={oldAccessPackage} newAccessPackage={selectedAccessPackage}/>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Tilbake
                </Button>
                <Button onClick={handleSave} color="primary" autoFocus>
                    Lagre
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmAccessPackageUpdate;