import React from 'react';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
} from "@material-ui/core";
import {AddCircleOutline, CameraAlt, Cancel, Description, Edit, Email, Error, House, Phone} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

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

const ConsentPolicyList = (props) => {

    // console.log("jennifer monday from policy list:" + props.personaldata)
    // const policy = props.policies.find(element => element.systemId === props.idToFind);
    // // const personalInfo = props.personaldata.find(element => element.id === policy.systemId);
    // const personalInfo = props.personaldata.find(element => element.systemId ==="1");
    // const reason = props.policypurpose.find(element => element.systemId === "1");


    const policy = props.policies.find(element => element.systemId === props.idToFind);
    const personalInfo = props.personaldata.find(element => element.systemId === policy.personalDataSystemIds[0]);
    const reason = props.policypurpose.find(element => element.systemId === policy.policyPurposeSystemIds[0]);

    function toggleIsActive () {
        policy.active=!policy.active;
        props.notify("Aktiv status endret");
    }

    if (policy && (policy.active || props.showNonActive)) {
        return <ListItem key={policy.systemId}>
            <ListItemAvatar>
                <Avatar /* className={classes.itemAvatar}*/ >
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
                        : <Typography style={{textDecoration:"line-through"}} > {personalInfo.name}</Typography>
                }
                secondary= {<>{reason.name}: {policy.description} </>}
            />
            <ListItemSecondaryAction>
                <IconButton
                    aria-label="Edit"
                    //onClick={() => this.editClient(client)}
                >
                    <Edit/>
                </IconButton>
                <IconButton
                    aria-label="Delete"
                    onClick={() => toggleIsActive(policy.active, policy.id)}
                >
                    {
                        policy.active
                            ? <Cancel />
                            : <AddCircleOutline />
                    }
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    }
    return null;
};

ConsentPolicyList.propTypes = {};
export default ConsentPolicyList;
