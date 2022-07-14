import React from "react";
import {
  Avatar,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from "@mui/material";
import { withStyles } from '@mui/styles';
import { Add } from "@mui/icons-material";
import ContactIcon from "@mui/icons-material/Person";
import AddIconCircle from "@mui/icons-material/AddCircle";
import OrganisationApi from "../../../data/api/OrganisationApi";
import InformationMessageBox from "../../../common/message-box/InformationMessageBox";
import PropTypes from "prop-types";
import { withContext } from "../../../data/context/withContext";

const styles = theme => ({
  addButton: {
    margin: 0,
    top: 100,
    left: "auto",
    bottom: "auto",
    right: 50,
    position: "fixed"
  },
  root: {},
  dialog: {
    height: "75%"
  },
  contactList: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2)
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
    backgroundColor: theme.palette.secondary.main
  },

  searchInput: {
    margin: theme.spacing(1),
    width: "80%"
  }
});

class ContactAddExisting extends React.Component {
  handleCancel = () => {
    this.setState({ showContactAdd: false, filteredContacts: [] });
  };

  openAddDialog = () => {
    this.setState({ showContactAdd: true });
  };

  onSearch = searchString => {
    let contacts = this.props.contacts;
    this.setState({
      filteredContacts: contacts.filter(
        c =>
          c.nin === searchString ||
          c.lastName.toLowerCase().includes(searchString.toLowerCase())
      )
    });
  };

  onCloseAddContact = confirmed => {
    this.setState({
      askToAddContact: false
    });

    if (confirmed) {
      this.addExitingContact(this.state.contact);
    }
  };

  askToAddContact = contact => {
    this.setState({
      askToAddContact: true,
      message: `Vil du legge ${contact.firstName} ${
        contact.lastName
      } til organisasjonen?`,
      contact: contact
    });
  };

  addExitingContact = contact => {
    OrganisationApi.addTechnicalContact(
      contact.nin,
      this.props.context.currentOrganisation.name
    )
      .then(response => {
        this.props.notify(
          `${contact.firstName} ${contact.lastName} ble lagt til.`
        );
        this.props.fetchTechnicalContacts();
        //.then(() => {
        this.onSearch(this.state.searchString);
        //}
        //);
      })
      .catch(error => {
        alert(error);
      });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.contacts !== prevState.contacts) {
      return {
        contacts: nextProps.contacts
      };
    }

    return null;
  }

  onChangeSearch = event => {
    this.setState({
      searchString: event.target.value
    });
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      showContactAdd: false,
      filteredContacts: [],
      searchString: "",
      askToAddContact: false,
      message: ""
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <InformationMessageBox
          show={this.state.askToAddContact}
          message={this.state.message}
          onClose={this.onCloseAddContact}
        />
        <Fab
          color="secondary"
          className={classes.addButton}
          onClick={this.openAddDialog}
          id={"addContactFab"}
        >
          <Add />
        </Fab>
        <Dialog
          open={this.state.showContactAdd}
          aria-labelledby="form-dialog-title"
          fullWidth
          classes={{
            paper: classes.dialog
          }}
        >
          <DialogTitle id="form-dialog-title">
            <Input
              autoFocus
              value={this.state.searchString}
              placeholder="Søk på etternavn"
              className={classes.searchInput}
              inputProps={{
                "aria-label": "Description"
              }}
              id={"addContactSearchField"}
              onChange={this.onChangeSearch}
              onKeyUp={() => this.onSearch(this.state.searchString)}
            />
          </DialogTitle>
          <DialogContent>
            <div className={classes.contactList}>
              <List id={"addContactSearchResult"}>
                {this.state.filteredContacts.map(contact => (
                  <ListItem className={classes.listItem} key={contact.dn}>
                    <ListItemAvatar>
                      <Avatar className={classes.itemAvatar}>
                        <ContactIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contact.firstName}
                      secondary={contact.lastName}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        color="secondary"
                        aria-label="Add"
                        id={"addContactButton"}
                        onClick={() => this.askToAddContact(contact)}
                      >
                        <AddIconCircle />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCancel}
              variant="contained"
              color="primary"
              id={"closeContactAddExisting"}
            >
              Lukk
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ContactAddExisting.propTypes = {
  classes: PropTypes.any.isRequired,
  contacts: PropTypes.any.isRequired,
  fetchTechnicalContacts: PropTypes.any.isRequired,
  notify: PropTypes.any.isRequired
};

export default withStyles(styles)(withContext(ContactAddExisting));
