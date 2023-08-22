import React, { Component } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Box,
    Tooltip,
    MenuItem,
    ListItemIcon,
    Menu,
    Button,
    TextField,
    FormControl, CircularProgress,
} from "@mui/material";
import { Add,Check,Save } from "@mui/icons-material";
import {green} from "@mui/material/colors";


class ConsentAddService extends React.Component {

    formIsValid = () => {
        return (
            this.state.serviceName &&
            this.state.serviceName !== ""
        );
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
        this.setState({showSpinner: true});
        this.hideAddServiceDialog();
        this.props
            .createService(this.state.serviceName, this.props.currentOrg)
            .then((response) => {
                this.setState({showAddService: false});
                if (response.status === 201) {
                    this.pollServiceStatus(response.headers.get("location"));
                } else {
                    this.setState({showSpinner: false});
                    this.props.notify("Oisann, det gikk ikke helt etter planen. Prøv igjen.")
                }
            });
    };

    pollServiceStatus = (statusUrl) => {
        const pollInterval = setInterval(() => {
            fetch(statusUrl)
                // .then((response) => {
                //     if (!response.ok) {
                //         throw new Error('Network response was not ok');
                //     }
                //     return response;
                // })
                // .then((response) => response.status)
                .then((response) => {
                    console.log("jennifer - polling url: ", statusUrl);
                    console.log("jennifer - polling status: ", response.status);
                    if (response.status === 201) {
                        clearInterval(pollInterval);
                        this.setState({
                            showSpinner: false,
                            showSuccessAlert: true
                        });
                        this.props.notify(`Tjenste '${this.state.serviceName}' ble lagt til!`);
                    } else if (response.status === 202) {
                        // No action needed for status 202; continue polling
                    } else {
                        clearInterval(pollInterval);
                        this.props.notify("Noe gikk galt under opprettelsen av tjenesten.");
                        this.setState({showSpinner: false});
                    }
                })
                .catch((error) => {
                    clearInterval(pollInterval);
                    console.error("Error while polling:", error);
                    this.props.notify("Noe gikk galt under polling av tjenestestatus.");
                    this.setState({showSpinner: false});
                });
        }, 3000);
    };


    constructor(props, context) {
        super(props, context);
        this.state = {
            anchorEl: null,
            menuIsOpen: false,
            showAddService: false,
            showSpinner: false,
            showSuccessAlert: false,
            serviceName: null,
        };
    };

    render() {

        return (
            <div>
                <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        // sx={buttonSx}
                        onClick={this.showAddServiceDialog}
                        sx={{
                            margin: 0,
                            top: 100,
                            left: "auto",
                            bottom: "auto",
                            right: 50,
                            position: "fixed"
                        }}
                    >
                        {this.state.showSpinner ? (
                            <Save />
                        ) : (
                            this.state.showSuccessAlert ? (
                                <Check />
                            ) : (
                                <Add />
                            )
                        )}

                    </Fab>
                    {this.state.showSpinner && (
                        <CircularProgress
                            size={68}
                            sx={{
                                color: green[500],
                                margin: 0,
                                top: 95,
                                left: "auto",
                                bottom: "auto",
                                right: 45,
                                position: "fixed"
                            }}
                        />
                    )}
                </Box>

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
                                label="Tjenster navn"
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
                            disabled={!this.formIsValid()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>


                {/*{this.state.showSpinner && <CircularProgress/>}*/}
                {this.state.showSpinner }
                {this.state.showSuccessAlert && (
                    <Alert severity="success">All good! Service added successfully.</Alert>
                )}
            </div>


        )
    }
}

ConsentAddService.propTypes = {};

export default ConsentAddService;
// export default withStyles(styles)(ConsentAddService);
