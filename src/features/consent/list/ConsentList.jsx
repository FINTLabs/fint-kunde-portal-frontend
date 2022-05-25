import React, { Component } from "react";
import {
    Avatar,
    IconButton,
    List,
    ListItemAvatar,
    Typography,
    withStyles,
    AccordionDetails,
    AccordionSummary,
    Accordion,
    Grid,
} from "@material-ui/core";
import {
    ExpandMore,
    FolderShared,
    AddCircle,
} from "@material-ui/icons";

import { withContext } from "../../../data/context/withContext";
import ConsentPolicyAdd from "../ConsentPolicyAdd";
import ConsentPolicyList from "./ConsentPolicyList";
import ConsentSearch from "./ConsentSearch";
import PropTypes from "prop-types";

const styles = theme => ({

    title: {
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(1)
    },
    listItem: {
        borderBottom: "1px dashed lightgray"
    },
    primaryAsset: {
        borderBottom: "1px dashed lightgray",
        backgroundColor: theme.palette.grey[200]
    },
    itemAvatar: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.light
    }
});



class ConsentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            showNonActive: false,
            showAddPolicyDialog: false,
            services: this.props.services,
            policies: this.props.policies,
            policypurpose: this.props.policypurpose,
            personaldata: this.props.personaldata,
        };
    }

    updateSearchValue = event => {
        this.setState({
            searchValue: event.target.value
        });
    };

    clearSearchValue = () => {
        this.setState({
            searchValue: ''
        });
    };

    handleChangeActive = (event) => {
        this.setState({
            showNonActive: event.target.checked,
        });
    };

    showAddPolicyDialog= (service) => {
        this.setState({
            showAddPolicyDialog: true,
            selectedService: service.name,
        });
    };

    hideAddPolicyDialog= () => {
        this.setState({
            showAddPolicyDialog: false,
            selectedService: null,
        });
        console.log("in consent list hide dialog");
    };

    render() {
        const { classes } = this.props;
        console.log("jennifer personal data from consent list:" + this.props.personaldata)
        return (
            <div>

                <ConsentSearch
                    showNonActive={this.state.showNonActive}
                    handleChange={this.handleChangeActive}
                    searchValue={this.state.searchValue}
                    updateSearch={this.updateSearchValue}
                    clearSearch={this.clearSearchValue}
                />

                <ConsentPolicyAdd
                    selectedService={this.state.selectedService}
                    showAddPolicyDialog={this.state.showAddPolicyDialog}
                    onClose={this.hideAddPolicyDialog}
                />

                <div className={classes.root}>
                    <div>

                        {this.props.services ? this.props.services
                            .filter(service => service.name.match(new RegExp(this.state.searchValue, "i")))
                            .map(service => (

                                <Accordion key={service.id}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <ListItemAvatar>
                                            <Avatar /* className={classes.itemAvatar}*/ >
                                                <FolderShared/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <Typography sx={{ xs: 9, flexShrink: 0 }}>
                                            {service.name}
                                        </Typography>

                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                            }}>
                                                <IconButton
                                                    color="secondary"
                                                    aria-label="Add"
                                                    id={"addSamtykkeButton"}
                                                    onClick={() => this.showAddPolicyDialog(service)}
                                                >
                                                    <AddCircle />
                                                </IconButton>
                                                <div>Legg behandling til {service.name}</div>
                                            </Grid>
                                            <Grid item xs={12}>

                                                <List id={"samtykkeList"}>
                                                    {service.policySystemIds
                                                        .map((data) => (
                                                            <ConsentPolicyList
                                                                idToFind={data}
                                                                testData={"test from jennifer"}
                                                                showNonActive={this.state.showNonActive}
                                                                notify={this.props.notify}
                                                                policies={this.props.policies}
                                                                policypurpose={this.props.policypurpose} // todo: replace with policyPurpose
                                                                personaldata={this.props.personaldata}
                                                            />
                                                        ))}
                                                </List>

                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>

                            )): "Error loading data"}

                    </div>

                </div>
            </div>
        );
    }
}

ConsentList.propTypes = {
    services: PropTypes.array.isRequired,
    policies: PropTypes.array.isRequired,
    policypurpose: PropTypes.array.isRequired,
    personaldata: PropTypes.array.isRequired
};

export default withStyles(styles)(withContext(ConsentList));