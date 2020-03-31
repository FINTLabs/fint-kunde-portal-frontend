import React, { Component } from "react";
import { Typography, withStyles } from "@material-ui/core";
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
    //const { classes } = this.props;
    return (
      <table>
        {this.state.items.map(log => (
          <tr>
            <td><Typography>{moment(log.timestamp).format("HH:mm:ss.SSS")}</Typography></td>
            <td><Typography>{log.event.client}</Typography></td>
            <td><Typography>{log.event.status}</Typography></td>
            <td><Typography>{log.event.responseStatus}</Typography></td>
            <td><Typography>{log.event.message}</Typography></td>
          </tr>
        ))}
      </table>
    );
  }
}

export default withStyles(styles)(LogEntry);
