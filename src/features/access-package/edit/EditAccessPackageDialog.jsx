import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Checkbox} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Sort from "../../../common/utils/Sort";

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
                    Velg komponenter du skal ha tilgang til
                </DialogContentText>
                <List component="nav" aria-label="Komponentlist" dense>
                    {componentConfiguration.sort(Sort.alphabetically).map(componentConfig => {

                        return (
                            <ListItem key={componentConfig.name}>
                                <ListItemText primary={componentConfig.displayName}/>
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