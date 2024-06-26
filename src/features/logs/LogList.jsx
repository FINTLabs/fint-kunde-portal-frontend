import React, {Component} from "react";
import {styled} from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogIcon from "@mui/icons-material/Timeline";
import {Box, Typography, AccordionDetails, AccordionSummary, Accordion, Button, Divider} from "@mui/material";
import moment from "moment";
import LogEntry from "./LogEntry";

const PREFIX = 'LogList';


class LogList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    distinct = () => {
        let seen = new Map();
        return this.props.log.filter(it => {
            let found = seen.has(it.corrId);
            seen.set(it.corrId, true);
            return !found;
        });
    };

    render() {
        return (
            <Box w={1}>
                {
                    this.distinct().length > 0 &&
                    <Box w={1} display='flex' justifyContent='flex-end' alignItems='center' m={1}>
                        <Box mr={1}>
                            <Typography
                                variant='button'>{`Antall: ${this.distinct().length}`}</Typography>
                        </Box>
                        | <Button size='small' onClick={this.props.onClear}>Nullstill</Button>
                    </Box>
                }
                {this.distinct().map(log => {
                    if (this.props.id.length > 0) {
                        if (log.corrId.includes(this.props.id))
                            return (
                                <Accordion w={1} minWidth={1} TransitionProps={{unmountOnExit: true}}
                                                key={log.corrId}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                    >
                                        <Box ><LogIcon/>
                                            <Box mx={4}>
                                                <Typography>
                                                    {moment(log.timestamp).format("HH:mm:ss")}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Typography>
                                                    {log.event.action}
                                                </Typography>
                                                <Typography variant={"body2"}
                                                            color={"primary"}>ID: {log.corrId}</Typography>
                                            </Box>
                                        </Box>
                                    </AccordionSummary>
                                    <Divider light/>
                                    <AccordionDetails>
                                        <LogEntry environment={this.props.environment}
                                                  organisation={this.props.orgName}>{log.corrId}</LogEntry>
                                    </AccordionDetails>
                                </Accordion>
                            )
                    } else
                        return (
                            <Accordion w={1} TransitionProps={{unmountOnExit: true}} key={log.corrId}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                >
                                    <Box><LogIcon/>
                                        <Box mx={4}>
                                            <Typography>
                                                {moment(log.timestamp).format("HH:mm:ss")}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography>{log.event.action}</Typography>

                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <Divider light/>
                                <AccordionDetails>
                                    <LogEntry environment={this.props.environment}
                                              organisation={this.props.orgName} log={log}>{log.corrId}</LogEntry>
                                </AccordionDetails>
                            </Accordion>
                        )
                return null})}
           </Box>
        );
    }
}

export default (LogList);
