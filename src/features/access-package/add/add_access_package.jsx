import React, {useState} from "react";
import { Fab } from '@mui/material';
import {makeStyles} from "@mui/styles";
import {Add} from "@mui/icons-material";
import {useSelector} from "react-redux";
import AddAccessPackageForm from "./add_access_package_form";

const useStyles = makeStyles((theme) => ({
    addButton: {
        margin: 0,
        top: 100,
        left: "auto",
        bottom: "auto",
        right: 50,
        position: "fixed"
    }
}));

const AddAccessPackage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const packages = useSelector(state => state.access_package.accessPackages);
    const [valid, setValid] = useState(false);

    function openAddDialog() {
        setOpen(true);
    }

    function closeAddAccessPackage() {
        setOpen(false);
    }

    function packageNameIsValid(event) {
        setValid(event);
    }

    return (
        <div>
            <Fab
                color="secondary"
                className={classes.addButton}
                onClick={openAddDialog}
            >
                <Add/>
            </Fab>
            <AddAccessPackageForm
                closeAddAccessPackage={closeAddAccessPackage}
                packageNameIsValid={packageNameIsValid}
                packages={packages}
                valid={valid}
                open={open}
                setOpen={setOpen}/>
        </div>
    );
};

export default AddAccessPackage;
