import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import { Fab } from "@mui/material";
import {Add} from "@mui/icons-material";
import {useSelector} from "react-redux";
import AddAccessPackageForm from "./add_access_package_form";

const PREFIX = 'AddAccessPackage';

const classes = {
    addButton: `${PREFIX}-addButton`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.addButton}`]: {
        margin: 0,
        top: 100,
        left: "auto",
        bottom: "auto",
        right: 50,
        position: "fixed"
    }
}));

const AddAccessPackage = () => {

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
        <Root>
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
        </Root>
    );
};

export default AddAccessPackage;
