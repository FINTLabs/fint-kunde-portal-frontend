import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Divider, IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles
} from "@material-ui/core";
import ContactIcon from "@material-ui/icons/Person";
import blue from "@material-ui/core/colors/blue";
import FeatureHelperText from "../../../common/help/FeatureHelperText";
import RolesIcon from "@material-ui/icons/LockOpenRounded";
import TooltipIconButton from "../../../common/button/TooltipIconButton";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(5)
  },
  legalContactList: {
    width: "75%"
  },
  title: {
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(1)
  },
  listItem: {
    borderBottom: "1px dashed lightgray"
  },
  itemAvatar: {
    color: "#fff",
    backgroundColor: theme.palette.secondary.light
  },
  removeIcon: {
    color: theme.palette.primary.light
  },
  setLegalIcon: {
    color: blue[700]
  }
});

class LegalList extends React.Component {

  render() {
    const { classes, legalContact } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.legalContactList}>
          <FeatureHelperText >
            <p>Kontakter er personer som har tilgang til kundeportalen.</p>
            <p>En juridisk kontakt er den som har det merkantile ansvaret.</p>
            <p>
              Tekniske kontakter er organisasjonens FINT administratorer. De vil
              få driftsmeldinger tilsendt ved behov.
            </p>
            <p>
              Ordinære driftsmeldinger sendes på epost. Kritiske driftmeldinger
              sendes på epost og SMS.
            </p>
          </FeatureHelperText>
          <Typography variant="h5" className={classes.title}>
            Juridisk kontakt
          </Typography>
          <Divider />
          <List id={"legalContactList"}>
            <ListItem className={classes.listItem} key={legalContact.dn}>
              <ListItemAvatar>
                <Avatar className={classes.itemAvatar}>
                  <ContactIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText id={"legalContactNameField"}
                primary={legalContact.firstName}
                secondary={legalContact.lastName}
              />
              <ListItemSecondaryAction>
                <TooltipIconButton
                    ariaLabel="Roles"
                    onClick={() => {
                    }}
                    id="manageRoles"
                    toolTip="Administrer roller for kontakten"
                >
                  <RolesIcon/>
                </TooltipIconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

LegalList.propTypes = {
  legalContact: PropTypes.object.isRequired
};
export default withStyles(styles)(LegalList);
