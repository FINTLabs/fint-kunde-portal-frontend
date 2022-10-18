import React from "react";
import {
    DialogTitle,
    DialogContent,
    DialogContentText,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    DialogActions,
    Button,
    Dialog
} from "@mui/material";


const EditAccessPackageDialog = (props) => {
    const {componentSelectorOpen, handleCloseComponentSelector, componentConfiguration, selectedAccessPackage, chooseComponent} = props;
    return (
        <Dialog
            open={componentSelectorOpen}
            onClose={handleCloseComponentSelector}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Legg til komponenter"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Velg komponenter til tilgangspakken
                </DialogContentText>
                <List component="nav" aria-label="Komponentlist" dense>
                    {componentConfiguration.map(componentConfig => {

                        return (
                            <ListItem key={componentConfig.name}>
                                <ListItemText primary={componentConfig.name}/>
                                <Checkbox
                                    checked={selectedAccessPackage ? selectedAccessPackage.components.includes(componentConfig.dn) : false}
                                    onChange={() => chooseComponent(componentConfig)}/>
                            </ListItem>);
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseComponentSelector} color="primary">
                    Ferdig
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAccessPackageDialog;