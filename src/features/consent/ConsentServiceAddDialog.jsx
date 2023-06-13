import React from "react";
import Button from "@material-ui/core/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withStyles,
    Fab,
    Box, Tooltip, MenuItem, ListItemIcon, Menu
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Add, CreateNewFolder} from "@material-ui/icons";
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import FormControl from "@material-ui/core/FormControl";


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
        console.log('click event')
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

    handleChange= (event) => {
        this.setState({serviceName: event.target.value});
    }

    handleAddService = () => {
        this.props
            .createService(this.state.serviceName)
            .then(() => {
                this.props.notify(
                    `Tjenste '${this.state.serviceName}' ble lagt til!`
                );
                // this.props.fetchAssets(this.props.context.currentOrganisation.name);
                this.setState({
                    showAddService: false,
                });
            });
    };

    showAddPolicyDialog = () => {
        this.setState({
            policyAddIsOpen: true,
        });
    };

    hideAddPolicyDialog = () => {
        this.setState({
            policyAddIsOpen: false,
        });
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            anchorEl: null,
            menuIsOpen: false,
            showAddService: false,
            policyAddIsOpen: false,
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
                            className={classes.addButton}
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
                    <MenuItem onClick={this.showAddPolicyDialog}>
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
                        <FormControl className={classes.inputForm} id={"serviceFormControl"}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
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
                    open={this.state.policyAddIsOpen}
                    onClose={this.hideAddPolicyDialog}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                    maxWidth={'md'}
                >
                    <DialogTitle id="form-dialog-title">Behandlingsgrunnlag</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Legg til en ny behandlingsgrunnlag.
                        </DialogContentText>
                        <FormControl className={classes.inputForm} id={"serviceFormControl"}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Behandlings code"
                                type="text"
                                fullWidth
                            />
                        </FormControl>
                        <FormControl className={classes.inputForm} id={"serviceFormControl"}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Behandlings navn"
                                type="text"
                                fullWidth
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.hideAddPolicyDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.hideAddPolicyDialog} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>

        )
    }
}

ConsentAddService.propTypes = {};

// export default ConsentAddService;
export default withStyles(styles)(ConsentAddService);
