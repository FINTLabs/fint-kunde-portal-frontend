import React from "react";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  Checkbox
} from "@material-ui/core";
import { Table, TableCell, TableRow, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
  dialogTitle: {
    backgroundColor: theme.palette.secondary.main
  },
  endpointMainTitle: {
    fontWeight: "bold",
    fontStyle: "italic"
  },
  endpointsCell: {
    paddingLeft: theme.spacing(5)
  }
});

class ComponentsView extends React.Component {
  handleClose = () => {
    this.setState({ open: false });
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
    const { classes, component } = this.props;
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
                      <TableCell variant="body">{component.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Beskrivelse</TableCell>
                      <TableCell variant="body">
                        {component.description}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Sti</TableCell>
                      <TableCell variant="body">{component.basePath}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell variant="head">Åpne data</TableCell>
                      <TableCell variant="body">
                        <Checkbox
                          name="openData"
                          checked={component.openData}
                          disabled={true}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">Felles</TableCell>
                      <TableCell variant="body">
                        <Checkbox
                          name="common"
                          checked={component.common}
                          disabled={true}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">FINT kjernekomponent</TableCell>
                      <TableCell variant="body">
                        <Checkbox
                            name="core"
                            checked={component.core}
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
                      <TableCell variant="body">
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
                      <TableCell variant="body">
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
                      <TableCell variant="body">
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
                >
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

ComponentsView.propTypes = {
  show: PropTypes.bool.isRequired,
  //component: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(ComponentsView);
