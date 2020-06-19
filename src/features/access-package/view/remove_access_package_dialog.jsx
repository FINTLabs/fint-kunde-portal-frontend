import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const RemoveAccessPackageDialog = (props) => {
    const {handleClose, openDialog, packageToDelete, deleteAccessPackage, classes} = props;
    return (
        <Dialog onClose={handleClose} aria-labelledby="Fjerne tilgangspakke" open={openDialog}>
            <DialogTitle id="Fjerne mottaker">Fjern tilgangspakke</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                Vil du fjerne tilgangspakken: {packageToDelete.shortDescription} ?
                <Typography variant="caption">(Fjerningen er permanent)</Typography>
            </DialogContent>
            <div className={classes.dialogButtons}>
                <Button variant="outlined" className={classes.buttonDontDeleteAccessPackage}
                        onClick={handleClose}>Nei</Button>
                <Button className={classes.buttonDeleteAccessPackage} variant="outlined"
                        onClick={() => deleteAccessPackage(packageToDelete)}>Ja</Button>
            </div>
        </Dialog>
    );
};

export default RemoveAccessPackageDialog;