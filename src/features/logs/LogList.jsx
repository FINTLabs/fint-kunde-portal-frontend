import React, {Component} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LogIcon from "@material-ui/icons/Timeline";
import {Box, Typography, withStyles} from "@material-ui/core";
import moment from "moment";
import LogEntry from "./LogEntry";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

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
                                <ExpansionPanel w={1} minWidth={1} TransitionProps={{unmountOnExit: true}}
                                                key={log.corrId}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
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
                                    </ExpansionPanelSummary>
                                    <Divider light/>
                                    <ExpansionPanelDetails>
                                        <LogEntry environment={this.props.environment}
                                                  organisation={this.props.orgName}>{log.corrId}</LogEntry>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                    } else
                        return (
                            <ExpansionPanel w={1} minWidth={1} TransitionProps={{unmountOnExit: true}} key={log.corrId}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
                                                       classes={{content: classes.expansionPanelSummary}}
                                >
                                    <Box className={classes.expansionPanelBox}><LogIcon/>
                                        <Box mx={4}>
                                            <Typography textAlign={"center"}>
                                                {moment(log.timestamp).format("HH:mm:ss")}
                                            </Typography>
                                        </Box>
                                        <Box className={classes.expansionPanelId}>
                                            <Typography>{log.event.action}</Typography>
                                            <Typography variant={"body2"}
                                                        color={"primary"}>ID: {log.corrId}</Typography>
                                        </Box>
                                    </Box>
                                </ExpansionPanelSummary>
                                <Divider light/>
                                <ExpansionPanelDetails>
                                    <LogEntry environment={this.props.environment}
                                              organisation={this.props.orgName}>{log.corrId}</LogEntry>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                })}
            </Box>
        );
    }
}

export default withStyles(styles)(LogList);
