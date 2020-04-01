import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";
import LogApi from "../../data/api/LogApi";

const styles = theme => ({
});

class LogEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    LogApi.fetchLogById(this.props.children).then(response => {
      let items = response[1];
      console.log(items);
      this.setState({ items: items });
    });

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Tid</TableCell>
                <TableCell>Klient</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Respons</TableCell>
                <TableCell>Melding</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.items.map(log => (
                <TableRow>
                  <TableCell component="th" scope="row">{moment(log.timestamp).format("HH:mm:ss.SSS")}</TableCell>
                  <TableCell>{log.event.client}</TableCell>
                  <TableCell>{log.event.status}</TableCell>
                  <TableCell>{log.event.responseStatus}</TableCell>
                  <TableCell>{log.event.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(LogEntry);
