import React, { Component } from "react";
import {
    Avatar,
    IconButton,
    List,
    ListItemAvatar,
    Typography,
    AccordionDetails,
    AccordionSummary,
    Accordion,
    Grid,
} from "@mui/material";
import {
    ExpandMore,
    FolderShared,
    AddCircle,
} from "@mui/icons-material";

import ConsentPolicyAddDialog from "./ConsentPolicyAddDialog";
import ConsentPolicyListItem from "./ConsentPolicyListItem";
import ConsentSearch from "./ConsentSearch";
import PropTypes from "prop-types";
import ConsentApi from "../data/ConsentApi";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import { withContext } from "../../../data/context/withContext";

class ConsentAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            showNonActive: false,
            showAddPolicyDialog: false,
            services: props.services,
            policypurpose: props.policypurpose,
            personaldata: props.personaldata,
            askToChangeActive: false,
            message: '',
            selectedService: false,
            policyToChange: '',
        };
    }

    updateSearchValue = (event) => {
        this.setState({ searchValue: event.target.value });
    };

    clearSearchValue = () => {
        this.setState({ searchValue: '' });
    };

    toggleShowActive = (event) => {
        this.setState({ showNonActive: event.target.checked });
    };

    handleOpenPolicy = (service) => {
        this.setState({
            showAddPolicyDialog: true,
            selectedService: service,
        });
    };

    handleClosePolicy = () => {
        this.setState({
            showAddPolicyDialog: false,
            selectedService: null,
        }, () => this.props.afterChange());
    };

    handleAskToChangeActive = (policy) => {
        this.setState({
            askToChangeActive: true,
            message: `Er du sikker på at du vil endre aktiv status på: "${policy.formal}"?`,
            policyToChange: policy,
        });
    };

    handleChangeActive = (result) => {
        if (result) {
            ConsentApi.setActive(this.props.currentOrg, this.state.policyToChange).then(() => {
                this.props.notify("Aktiv status endret");
                this.props.afterChange();
            });
        }
        this.setState({ askToChangeActive: false });
    };

    render() {
        const { searchValue, showNonActive, showAddPolicyDialog, services, policypurpose, personaldata, askToChangeActive, message, selectedService } = this.state;

        return (
            <div>
                <WarningMessageBox
                    show={askToChangeActive}
                    message={message}
                    onClose={this.handleChangeActive}
                />

                <ConsentSearch
                    showNonActive={showNonActive}
                    handleChange={this.toggleShowActive}
                    searchValue={searchValue}
                    updateSearch={this.updateSearchValue}
                    clearSearch={this.clearSearchValue}
                />

                <ConsentPolicyAddDialog
                    selectedService={selectedService}
                    show={showAddPolicyDialog}
                    onClose={this.handleClosePolicy}
                    personaldata={personaldata}
                    policypurpose={policypurpose}
                    notify={this.props.notify}
                    createPolicy={this.props.createPolicy}
                    currentOrg={this.props.currentOrg}
                />

                <div>
                    {services && services
                        .filter(service => (searchValue && service.navn && service.navn.match(new RegExp(searchValue, "i"))) || !searchValue)
                        .map(service => (
                            <Accordion key={service.id}>
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderShared />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <Typography>{service.navn}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', backgroundColor: '#f5f5f5' }}>
                                            <IconButton color="secondary" onClick={() => this.handleOpenPolicy(service)}>
                                                <AddCircle />
                                            </IconButton>
                                            <div>Legg behandling til {service.navn}</div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <List>
                                                {service.behandlingIds.map((data) => (
                                                    <ConsentPolicyListItem
                                                        key={data}
                                                        idToFind={data}
                                                        showNonActive={showNonActive}
                                                        confirm={this.handleAskToChangeActive}
                                                        policies={this.props.policies}
                                                        policypurpose={policypurpose}
                                                        personaldata={personaldata}
                                                        notify={this.props.notify}
                                                    />
                                                ))}
                                            </List>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                </div>
            </div>
        );
    }
}

ConsentAccordion.propTypes = {
    services: PropTypes.array.isRequired,
    policies: PropTypes.array.isRequired,
    policypurpose: PropTypes.array.isRequired,
    personaldata: PropTypes.array.isRequired,
    currentOrg: PropTypes.string,
    afterChange: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
    createPolicy: PropTypes.func.isRequired,
};

export default (withContext(ConsentAccordion));
