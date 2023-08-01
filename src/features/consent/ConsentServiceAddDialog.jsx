import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withStyles,
    Fab,
    Box, Tooltip, MenuItem, ListItemIcon, Menu, Button, TextField, FormControl
} from "@mui/material";

import {Add, CreateNewFolder} from "@mui/icons-material";
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import PropTypes from "prop-types";

const styles = () => ({
    addButton: {
        margin: 0,
        top: 100,
        left: "auto",
        bottom: "auto",
        right: 50,
        position: "fixed"
    },
    inputForm: {
        width: "100%"
    },
});

class ConsentAddService extends React.Component {

    showMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            menuIsOpen: true,
        });
    };

    closeMenu = () => {
        this.setState({
            anchorEl: null,
            menuIsOpen: false,
        });
    };

    showAddServiceDialog = () => {
        this.setState({
            showAddService: true,
        });
    };

    hideAddServiceDialog = () => {
        this.setState({
            showAddService: false,
        });
    };

    handleChange = e => {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    };

    handleAddService = () => {
        this.props
            .createService(this.state.serviceName)
            .then(() => {
                this.props.notify(
                    `Tjenste '${this.state.serviceName}' ble lagt til!`
                );
                // this.props.fetchAssets(this.props.context.currentOrganisation.name);
                console.log("jennifer-in add serviceContext dialog and before change")
                this.props.afterChange();
                this.setState({
                    showAddService: false,
                });
            });
    };

    showAddReasonDialog = () => {
        this.setState({
            showAddReason: true,
        });
    };

    hideAddReasonDialog = () => {
        this.setState({
            showAddReason: false,
        });
    };

    handleAddReason = () => {
        this.props
            .createPolicypurpose(this.state.reasonName, this.state.rCode)
            .then(() => {
                this.props.notify(
                    `behandlingsgrunnlag '${this.state.reasonName}' ble lagt til!`
                );
                this.props.afterChange();
                this.setState({
                    showAddReason: false,
                });
            });
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            anchorEl: null,
            menuIsOpen: false,
            showAddService: false,
            showAddReason: false,
        };
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Legg til">
                        <Fab
                            onClick={this.showMenu}
                            color="secondary"
                            // className={classes.addButton}
                            sx={{
                                    margin: 0,
                                    top: 100,
                                    left: "auto",
                                    bottom: "auto",
                                    right: 50,
                                    position: "fixed"
                                }}
                        >
                            <Add />
                        </Fab>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={this.state.anchorEl}
                    id="account-menu"
                    open={this.state.menuIsOpen}
                    onClose={this.closeMenu}
                    onClick={this.closeMenu}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >

                    <MenuItem onClick={this.showAddServiceDialog}>
                        <ListItemIcon>
                            <CreateNewFolder fontSize="small" />
                        </ListItemIcon>
                        Legg til Tjenster
                    </MenuItem>
                    <MenuItem onClick={this.showAddReasonDialog}>
                        <ListItemIcon>
                            <VerifiedUser fontSize="small" />
                        </ListItemIcon>
                        Legg til Behandlingsgrunnlag
                    </MenuItem>
                </Menu>

                <Dialog
                    open={this.state.showAddService}
                    onClose={this.hideAddServiceDialog}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'md'}
                >
                    <DialogTitle id="form-dialog-title">Legg til Tjenster</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Legg til en ny tjeneste.
                        </DialogContentText>
                        <FormControl id={"serviceFormControl"} sx={{width: "100%"}}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="serviceName"
                                name={"serviceName"}
                                label="Tjenster name"
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideAddServiceDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddService} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.showAddReason}
                    onClose={this.hideAddReasonDialog}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'md'}
                >
                    <DialogTitle id="form-dialog-title">Behandlingsgrunnlag</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Legg til en ny behandlingsgrunnlag.
                        </DialogContentText>
                        <FormControl id={"serviceFormControl"} sx={{width: "100%"}}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="rCode"
                                name={"rCode"}
                                label="Behandlings code"
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </FormControl>
                        <FormControl id={"serviceFormControl"} sx={{width: "100%"}}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="reasonName"
                                name={"reasonName"}
                                label="Behandlings navn"
                                type="text"
                                fullWidth
                                onChange={this.handleChange}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideAddReasonDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddReason} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>

        )
    }
}

ConsentAddService.propTypes = {
};

export default ConsentAddService;
// export default withStyles(styles)(ConsentAddService);
