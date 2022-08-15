import React from "react";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingProgress from "../../common/status/LoadingProgress";
import {
  createClient,
  deleteClient,
  fetchClients,
  updateClient
} from "../../data/redux/dispatchers/client";
import ClientList from "./ClientList";
import ClientAdd from "./add/ClientAdd";
import { withContext } from "../../data/context/withContext";
import AutoHideNotification from "../../common/notification/AutoHideNotification";

const PREFIX = 'ClientsContainer';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {}
}));

class ClientsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientAdded: false,
      notify: false,
      notifyMessage: ""
    };
  }

  componentDidMount() {
    this.props.fetchClients(this.props.context.currentOrganisation.name);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.context !== this.props.context) {
      this.props.fetchClients(this.props.context.currentOrganisation.name);
    }
  }

  notify = message => {
    this.setState({
      notify: true,
      notifyMessage: message
    });
  };

  onCloseNotification = () => {
    this.setState({
      notify: false,
      notifyMessage: ""
    });
  };

  afterAddClient = () => {
    this.props.fetchClients(this.props.context.currentOrganisation.name);
  };

  render() {
    if (
      this.props.clients === undefined ||
      this.props.context.currentOrganisation === undefined
    ) {
      return <LoadingProgress />;
    } else {
      return this.renderClients();
    }
  }

  renderClients() {
    return (
      <Root className={classes.root}>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}
        />
        <ClientList
          clients={this.props.clients}
           updateClient={this.props.updateClient}
          deleteClient={this.props.deleteClient}
        />
        <ClientAdd
          organisation={this.props.context.currentOrganisation}
          notify={this.notify}
          afterAdd={this.afterAddClient}
        />
      </Root>
    );
  }
}

ClientsContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    clients: state.client.clients,
    components: state.component.components
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchClients: fetchClients,
      updateClient: updateClient,
      deleteClient: deleteClient,
      createClient: createClient
    },
    dispatch
  );
}

export default (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withContext(ClientsContainer))
);
