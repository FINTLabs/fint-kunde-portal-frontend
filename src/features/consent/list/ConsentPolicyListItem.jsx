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

        const policy = this.props.policies.find(element => element.id === this.props.idToFind);
        const personalInfo = this.props.personaldata.find(element => element.id === (policy?.personopplysningId || null));
        const reason = this.props.policypurpose.find(element => element.id === (policy?.behandlingsgrunnlagId || null));

        if (policy && (policy.aktiv || this.props.showNonActive)) {
            return <ListItem key={policy.systemId}>
                <ListItemAvatar>
                    <Avatar>
                        {
                            policy.aktiv
                                ? renderListIcon(personalInfo?.kode || 'error')
                                : renderListIcon('error')
                        }
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        policy.aktiv
                            ? <>{policy.formal} </>
                            : <Typography style={{textDecoration: "line-through"}}> {policy.formal}</Typography>
                    }
                    secondary={
                        <> {personalInfo?.kode || 'N/A'}: {personalInfo?.navn || 'N/A'} {reason?.kode || 'N/A'}: {reason?.navn || 'N/A'} </>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Change status"
                        onClick={() => this.props.confirm(policy)}
                    >
                        {
                            policy.aktiv
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