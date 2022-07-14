import React, {Component} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from "moment";
import LogApi from "../../data/api/LogApi";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import { withStyles } from '@mui/styles';


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
                {this.state.items.length>0 && <Typography variant={"body2"}
                                                          color={"primary"}>ID: {this.state.items[0].corrId}</Typography>}
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
