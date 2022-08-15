import React from "react";
import { styled } from "@mui/material/styles";
import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Button
} from "@mui/material";
import PropTypes from "prop-types";

const PREFIX = 'ComponentsView';

const classes = {
    dialogTitle: `${PREFIX}-dialogTitle`,
    endpointMainTitle: `${PREFIX}-endpointMainTitle`,
    endpointsCell: `${PREFIX}-endpointsCell`
};

const Root = styled('div/')((
    {
        theme
    }
) => ({
    [`& .${classes.dialogTitle}`]: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText
    },

    [`& .${classes.endpointMainTitle}`]: {
        fontWeight: "bold",
        fontStyle: "italic"
    },

    [`& .${classes.endpointsCell}`]: {
        paddingLeft: theme.spacing(5)
    }
}));

class ComponentsView extends React.Component {
    handleClose = () => {
        this.setState({open: false});
        this.props.onClose();
    };

    constructor(props) {
        super(props);
        this.state = {
            open: props.show
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.show !== prevState.show) {
            return {
                open: nextProps.show
            };
        }
        return null;
    }

    render() {
        const { component} = this.props;
        if (component) {
            return (
                <div>
                    <div>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="form-dialog-title"
                            maxWidth="md"
                        >
                            <DialogTitle
                                id="form-dialog-title"
                                className={classes.dialogTitle}

                            >
                                Komponent: {component.description}
                            </DialogTitle>
                            <DialogContent>
                                <Table className={classes.table}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell variant="head">Navn</TableCell>
                                            <TableCell variant="body"
                                                       id={"componentNameCell"}>{component.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Beskrivelse</TableCell>
                                            <TableCell variant="body" id={"componentDescriptionCell"}>
                                                {component.description}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Sti</TableCell>
                                            <TableCell variant="body"
                                                       id={"componentBasePathCell"}>{component.basePath}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell variant="head">Åpne data</TableCell>
                                            <TableCell variant="body">
                                                <Checkbox
                                                    name="openData"
                                                    id={"componentOpenDataCheckbox"}
                                                    checked={component.openData}
                                                    disabled={true}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head">Felles</TableCell>
                                            <TableCell variant="body">
                                                <Checkbox
                                                    id={"componentCommonCheckbox"}
                                                    name="common"
                                                    checked={component.common}
                                                    disabled={true}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                colSpan={2}
                                                className={classes.endpointMainTitle}
                                            >
                                                Miljøer
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                className={classes.endpointsCell}
                                            >
                                                Produksjon
                                            </TableCell>
                                            <TableCell variant="body">
                                                <Checkbox
                                                    id={"componentProductionCheckbox"}
                                                    name="inProduction"
                                                    checked={component.inProduction}
                                                    disabled={true}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                className={classes.endpointsCell}
                                            >
                                                Beta
                                            </TableCell>
                                            <TableCell variant="body">
                                                <Checkbox
                                                    id={"componentInBetaCheckbox"}
                                                    name="inBeta"
                                                    checked={component.inBeta}
                                                    disabled={true}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                className={classes.endpointsCell}
                                            >
                                                Play-with-FINT
                                            </TableCell>
                                            <TableCell variant="body">
                                                <Checkbox
                                                    id={"componentPWFCheckbox"}
                                                    name="inPlayWithFint"
                                                    checked={component.inPlayWithFint}
                                                    disabled={true}
                                                />
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                colSpan={2}
                                                className={classes.endpointMainTitle}
                                            >
                                                Endepunkter
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                className={classes.endpointsCell}
                                            >
                                                Produksjon
                                            </TableCell>
                                            <TableCell variant="body" id={"componentProductionCell"}>
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://api.felleskomponent.no${
                                                        component.basePath
                                                    }`}
                                                >
                                                    https://api.felleskomponent.no{component.basePath}
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                className={classes.endpointsCell}
                                            >
                                                Beta
                                            </TableCell>
                                            <TableCell variant="body" id={"componentBetaCell"}>
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://beta.felleskomponent.no${
                                                        component.basePath
                                                    }`}
                                                >
                                                    https://beta.felleskomponent.no{component.basePath}
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                className={classes.endpointsCell}
                                            >
                                                Play-with-FINT
                                            </TableCell>
                                            <TableCell variant="body" id={"componentPWFCell"}>
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://play-with-fint.felleskomponent.no${
                                                        component.basePath
                                                    }`}
                                                >
                                                    https://play-with-fint.felleskomponent.no
                                                    {component.basePath}
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                colSpan={2}
                                                className={classes.endpointMainTitle}
                                            >
                                                Swagger
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                className={classes.endpointsCell}
                                            >
                                                Produksjon
                                            </TableCell>
                                            <TableCell variant="body">
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://api.felleskomponent.no${
                                                        component.basePath
                                                    }/swagger-ui.html`}
                                                    id={"componentProductionSwaggerCell"}
                                                >
                                                    https://api.felleskomponent.no{component.basePath}
                                                    /swagger-ui.html
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                className={classes.endpointsCell}
                                            >
                                                Beta
                                            </TableCell>
                                            <TableCell variant="body">
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://beta.felleskomponent.no${
                                                        component.basePath
                                                    }/swagger-ui.html`}
                                                    id={"componentBetaSwaggerCell"}
                                                >
                                                    https://beta.felleskomponent.no{component.basePath}
                                                    /swagger-ui.html
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                variant="head"
                                                className={classes.endpointsCell}
                                            >
                                                Play-with-FINT
                                            </TableCell>
                                            <TableCell variant="body">
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href={`https://play-with-fint.felleskomponent.no${
                                                        component.basePath
                                                    }/swagger-ui.html`}
                                                    id={"componentPWFSwaggerCell"}
                                                >
                                                    https://play-with-fint.felleskomponent.no
                                                    {component.basePath}/swagger-ui.html
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    onClick={this.handleClose}
                                    variant="contained"
                                    color="secondary"
                                    id={"componentOKButton"}
                                >
                                    Ok
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            );
        } else {
            return <div/>;
        }
    }
}

ComponentsView.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default (ComponentsView);
