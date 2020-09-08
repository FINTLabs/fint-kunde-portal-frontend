import React, {Component} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from "moment";
import LogApi from "../../data/api/LogApi";
import Box from "@material-ui/core/Box";
import {withStyles} from "@material-ui/core";


const styles = theme => ({
    tableMessage: {
        maxWidth: 120,
        overflow: "auto"
    }
});

class LogEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        LogApi.fetchLogById(this.props.environment, this.props.organisation, this.props.children).then(response => {
            this.setState({items: response[1]});
        });

    }

    render() {
        const { classes } = this.props;
        return (
            <Box width={1}>
                <Table size="small" aria-label="a dense table">
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
                            <TableRow key={log.event.status}>
                                <TableCell component="th"
                                           scope="row">{moment(log.timestamp).format("HH:mm:ss.SSS")}</TableCell>
                                <TableCell>{log.event.client}</TableCell>
                                <TableCell>{log.event.status}</TableCell>
                                <TableCell>{log.event.responseStatus}</TableCell>
                                <TableCell id={"tableMessage"} className={classes.tableMessage}>{log.event.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        );
    }
}
LogEntry.propTypes = {};

export default withStyles(styles)(LogEntry);
