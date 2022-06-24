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
    Box,
    Tooltip,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Add} from "@material-ui/icons";
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
                            onClick={this.showAddServiceDialog}
                            color="secondary"
                            className={classes.addButton}
                        >
                            <Add />
                        </Fab>
                    </Tooltip>
                </Box>
                <Dialog
                    open={this.state.showAddService}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Legg til Tjenster</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            information about adding a new serivce to this and stuff and interesting items goes here.
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
                        <Button
                            onClick={this.hideAddServiceDialog}
                            color="primary"
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleAddService}
                            color="primary"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        )
    }
}

ConsentAddService.propTypes = {};
export default withStyles(styles)(ConsentAddService);