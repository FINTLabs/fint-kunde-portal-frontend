import React from "react";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    FormControl,
    TextField,
} from "@mui/material";
import {Add, Check, Save} from "@mui/icons-material";
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
                    console.log("jennifer - response.headers.get(location): ", response.headers.get("location"));
                } else {
                    this.setState({showSpinner: false});
                    this.props.notify("Oisann, det gikk ikke helt etter planen. Prøv igjen.")
                }
            });
    };

    pollServiceStatus = async (statusUrl) => {
        const checkStatus = async () => {
            try {
                const response = await fetch(statusUrl);
                console.log("Polling status: ", response.status);
                return response.status;
            } catch (error) {
                console.error("Error while polling:", error);
                throw error; // Rethrow to handle it in the higher-level try-catch
            }
        };

        try {
            let status = await checkStatus();
            while (status === 202) { // Assume 202 means "still processing"
                await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds before polling again
                status = await checkStatus(); // Re-check status
            }

            if (status === 201) {
                console.log('Service addition confirmed with status 201');
                this.setState({ showSpinner: false });
                this.props.notify(`Tjeneste '${this.state.serviceName}' ble lagt til!`);
                this.props.afterChange(); // Execute afterChange only after confirming the service is added
            } else {
                // Handle other statuses if needed
                this.setState({ showSpinner: false });
                this.props.notify("Service addition failed or in uncertain state.");
            }
        } catch (error) {
            // Handle any errors that occurred during polling
            this.setState({ showSpinner: false });
            this.props.notify("An error occurred during the polling process.");
        }
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
            </div>


        )
    }
}

ConsentAddService.propTypes = {};

export default ConsentAddService;
// export default withStyles(styles)(ConsentAddService);
