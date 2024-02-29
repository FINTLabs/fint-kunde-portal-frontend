import React from 'react';
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText, Typography} from "@mui/material";
import {AddCircleOutline, Cancel} from "@mui/icons-material";
import PropTypes from "prop-types";

class ConsentPolicyListItem extends React.Component {

    render() {

        const policy = this.props.policies.find(element => element.id === this.props.idToFind);
        const personalInfo = this.props.personaldata.find(element => element.id === (policy?.personopplysningIds[0] || null));
        const reason = this.props.policypurpose.find(element => element.id === (policy?.behandlingsgrunnlagIds[0] || null));

        if (policy && (policy.aktiv || this.props.showNonActive)) {
            return <ListItem key={policy.systemId}>

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