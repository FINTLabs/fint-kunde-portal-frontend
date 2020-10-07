import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar/AppBar";

const EditAccessPackageAppBar = (props) => {
    const {classes, handleClose, handleSaveAccess, selectedAccessPackage} = props;
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={() => handleClose(true)} aria-label="close">
                    <CloseIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {selectedAccessPackage.name}
                </Typography>
                <Button autoFocus color="inherit" onClick={() => handleSaveAccess(selectedAccessPackage)}>
                    Lagre
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default EditAccessPackageAppBar;