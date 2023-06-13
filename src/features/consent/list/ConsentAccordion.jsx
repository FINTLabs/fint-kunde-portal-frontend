import React, {useEffect, useState} from "react";
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
} from "@mui/material";
import {
    ExpandMore,
    FolderShared,
    AddCircle,
} from "@mui/icons-material";

import { withContext } from "../../../data/context/withContext";
import ConsentPolicyAddDialog from "./ConsentPolicyAddDialog";
import ConsentPolicyListItem from "./ConsentPolicyListItem";
import ConsentSearch from "./ConsentSearch";
import PropTypes from "prop-types";
import ConsentApi from "../data/ConsentApi";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";

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



// class ConsentAccordion extends Component {
const ConsentAccordion = (props) => {
    const [searchValue, setSerchValue] = useState('');
    const [showNonActive, setShowNonActive] = useState(false);
    const [showAddPolicyDialog, setShowAddPolicyDialog] = useState(false);
    const [services, setServices] = useState(props.services);
    const [policypurpose] = useState(props.policypurpose);
    const [personaldata] = useState(props.personaldata);
    const [askToChangeActive, setAskToChangeActive] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedService, setSelectedService] = useState(false);
    const [policyToChange, setPolicyToChange] = useState('');

    useEffect(() => {
        console.log("useEffect has been called!");
        setServices(props.services);
    },[props.services]);

    const updateSearchValue = event => {
        setSerchValue(event.target.value);
    };

    const clearSearchValue = () => {
        setSerchValue('');
    };

    const toggleShowActive = (event) => {
        setShowNonActive(event.target.checked);
    };

    const handleOpenPolicy= (service) => {
        console.log("jennifer", service.name);
        setShowAddPolicyDialog(true);
        setSelectedService(service);
    };

    const handleClosePolicy= () => {
        console.log("jennifer close add policy dialog");
        setShowAddPolicyDialog(false);
        setSelectedService(null);
    };


    const handleAskToChangeActive = (policy) => {
        console.log("jennifer - ask to change" + policy.active)
        setAskToChangeActive(true);
        setMessage( "Er du sikker på at du vil endre aktiv status på: \" " +
            policy.description +
            "\" ?");
        setPolicyToChange(policy);
    };

    const handleChangeActive = (result) => {
        setAskToChangeActive(false);

        if(result) {
            // TODO remove this when we have real data
            policyToChange.active = !policyToChange.active;
            // TODO move this to the right place
            ConsentApi.setActive(policyToChange);

            props.notify("Aktiv status endret");
        }
    };

    return (
        <div>

            <WarningMessageBox
                show={askToChangeActive}
                message={message}
                onClose={handleChangeActive}
            />

            <ConsentSearch
                showNonActive={showNonActive}
                handleChange={toggleShowActive}
                searchValue={searchValue}
                updateSearch={updateSearchValue}
                clearSearch={clearSearchValue}
            />

            <ConsentPolicyAddDialog
                selectedService={selectedService}
                show={showAddPolicyDialog}
                onClose={handleClosePolicy}
                personaldata={personaldata}
                policypurpose={policypurpose}
                notify={props.notify}
                createPolicy={props.createPolicy}
            />

            <div>
                <div>

                    {services ? services
                        .filter(service => service.name.match(new RegExp(searchValue, "i")))
                        .map(service => (

                            <Accordion key={service.systemId}>
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
                                    <Typography display="block">
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
                                                onClick={() => handleOpenPolicy(service)}
                                            >
                                                <AddCircle />
                                            </IconButton>
                                            <div>Legg behandling til {service.name}</div>
                                        </Grid>
                                        <Grid item xs={12}>

                                            <List id={"samtykkeList"} >
                                                {service.policySystemIds
                                                    .map((data) => (
                                                        <ConsentPolicyListItem
                                                            key={data}
                                                            idToFind={data}
                                                            showNonActive={showNonActive}
                                                            confirm={handleAskToChangeActive}
                                                            policies={props.policies}
                                                            policypurpose={props.policypurpose} // todo: replace with policyPurpose
                                                            personaldata={props.personaldata}
                                                            notify={props.notify}
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

ConsentAccordion.propTypes = {
    services: PropTypes.array.isRequired,
    policies: PropTypes.array.isRequired,
    policypurpose: PropTypes.array.isRequired,
    personaldata: PropTypes.array.isRequired
};

// export default withStyles(styles)(withContext(ConsentAccordion));
export default withContext(ConsentAccordion);