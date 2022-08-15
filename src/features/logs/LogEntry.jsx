import React, {Component} from "react";
import { styled } from "@mui/material/styles";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import LogApi from "../../data/api/LogApi";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const PREFIX = 'LogEntry';

const classes = {
    tableMessage: `${PREFIX}-tableMessage`
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`& .${classes.tableMessage}`]: {
        maxWidth: 120,
        overflow: "auto"
    }
}));

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
        return (
            <StyledBox width={1}>
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
            </StyledBox>
        );
    }
}
LogEntry.propTypes = {};

export default (LogEntry);
