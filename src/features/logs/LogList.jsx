import React, {Component} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LogIcon from "@material-ui/icons/Timeline";
import {Box, Typography} from "@material-ui/core";
import moment from "moment";
import LogEntry from "./LogEntry";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";


class LogList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    distinct = () => {
        let seen = new Map()
        return this.props.log.filter(it => {
            let found = seen.has(it.corrId);
            seen.set(it.corrId, true);
            return !found;
        });
    }

    render() {
        return (
            <Box>
                {
                    this.distinct().length > 0 &&
                    <Box display='flex' justifyContent='flex-end' alignItems='center' m={1}>
                        <Box mr={1}>
                            <Typography
                                variant='button'>{`Antall: ${this.distinct().length}`}</Typography>
                        </Box>
                        | <Button size='small' onClick={this.props.onClear}>Nullstill</Button>
                    </Box>
                }
                {this.distinct().map(log => (
                    <ExpansionPanel TransitionProps={{unmountOnExit: true}} key={log.corrId}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <LogIcon/>
                            <Box mx={4}>
                                <Typography>
                                    {moment(log.timestamp).format("HH:mm:ss")}
                                </Typography>
                            </Box>
                            <Typography>
                                {log.event.action}
                            </Typography>
                        </ExpansionPanelSummary>
                        <Divider light/>
                        <ExpansionPanelDetails>
                            <LogEntry>{log.corrId}</LogEntry>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </Box>
        );
    }
}

export default LogList;
