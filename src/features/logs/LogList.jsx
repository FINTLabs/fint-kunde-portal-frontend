import React, {Component} from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LogIcon from "@material-ui/icons/Timeline";
import {Box, Typography, withStyles} from "@material-ui/core";
import moment from "moment";
import LogEntry from "./LogEntry";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const styles = theme => ({
    expansionPanelSummary: {
        display: "flex",
        flexDirection: "column",
    },
    expansionPanelBox: {
        display: "flex",
        flexDirection: "row",
    },
    expansionPanelId: {
        display: "flex",
        flexDirection: "column",
    },
});

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
        const {classes} = this.props;
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
                                                           classes={{content: classes.expansionPanelSummary}}
                                    >
                                        <Box className={classes.expansionPanelBox}><LogIcon/>
                                            <Box mx={4}>
                                                <Typography>
                                                    {moment(log.timestamp).format("HH:mm:ss")}
                                                </Typography>
                                            </Box>
                                            <Box className={classes.expansionPanelId}>
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
                                                       classes={{content: classes.expansionPanelSummary}}
                                >
                                    <Box className={classes.expansionPanelBox}><LogIcon/>
                                        <Box mx={4}>
                                            <Typography>
                                                {moment(log.timestamp).format("HH:mm:ss")}
                                            </Typography>
                                        </Box>
                                        <Box className={classes.expansionPanelId}>
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

export default withStyles(styles)(LogList);
