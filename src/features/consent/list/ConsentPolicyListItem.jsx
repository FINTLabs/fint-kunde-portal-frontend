import React from 'react';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@mui/material";
import {AddCircleOutline, CameraAlt, Cancel, Description, Email, Error, House, Phone} from "@mui/icons-material";
import PropTypes from "prop-types";

function renderListIcon(code) {
    switch(code) {
        case 'numbers':
            return (<Description/>);
        case 'phone':
            return (<Phone/>);
        case 'picture':
            return (<CameraAlt/>);
        case 'email':
            return (<Email/>);
        case 'fnr':
            return (<House/>);
        case 'error':
            return (<Error/>);
        default:
            return 'foo';
    }
}

class ConsentPolicyListItem extends React.Component {

    render() {

        const policy = this.props.policies.find(element => element.systemId === this.props.idToFind);
        const personalInfo = this.props.personaldata.find(element => element.systemId === policy.personalDataSystemIds[0]);
        const reason = this.props.policypurpose.find(element => element.systemId === policy.policyPurposeSystemIds[0]);

        if (policy && (policy.active || this.props.showNonActive)) {
            return <ListItem key={policy.systemId}>
                <ListItemAvatar>
                    <Avatar>
                        {
                            policy.active
                                ? renderListIcon(personalInfo.code)
                                : renderListIcon('error')
                        }
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        policy.active
                            ? <>{personalInfo.name}</>
                            : <Typography style={{textDecoration: "line-through"}}> {personalInfo.name}</Typography>
                    }
                    secondary={<>{reason.name}: {policy.description}</>}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Delete"
                        onClick={() => this.props.confirm(policy)}
                    >
                        {
                            policy.active
                                ? <Cancel/>
                                : <AddCircleOutline/>
                        }
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        }
        return null;
    }
}

ConsentPolicyListItem.propTypes = {
    notify : PropTypes.func.isRequired,

};
export default ConsentPolicyListItem;