import React from "react";
import { Toolbar, IconButton, Typography, Button, AppBar } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";


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