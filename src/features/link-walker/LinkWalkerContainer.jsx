import React, { Component } from "react";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import { withContext } from "../../data/context/withContext";
import LinkWalkerTestList from "./LinkWalkerTestList";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchLinkWalkerTests } from "../../data/redux/dispatchers/linkwalker";
import PropTypes from "prop-types";
import LoadingProgress from "../../common/status/LoadingProgress";
import LinkWalkerAddTest from "./LinkWalkerAddTest";
import { fetchClients } from "../../data/redux/dispatchers/client";
import ComponentApi from "../../data/api/ComponentApi";

class LinkWalkerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notify: false,
      notifyMessage: "",
      components: []
    };
  }

  getOrganisationComponents = organisationName => {
    ComponentApi.getOrganisationComponents(organisationName).then(
      ([response, json]) => {
        if (response.status === 200) {
          this.setState({ components: json });
        }
      }
    );
  };

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

  componentDidMount() {
    const { currentOrganisation } = this.props.context;
    this.props.fetchLinkWalkerTests(
      currentOrganisation.name
    );
    this.props.fetchClients(currentOrganisation.name);
    this.getOrganisationComponents(currentOrganisation.name);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentOrganisation } = this.props.context;
    if (prevProps.context !== this.props.context) {
      this.props.fetchLinkWalkerTests(
        currentOrganisation.name
      );
      this.props.fetchClients(currentOrganisation.name);
      this.getOrganisationComponents(currentOrganisation.name);
    }
  }

  render() {
    if (this.props.context.currentOrganisation === undefined) {
      return <LoadingProgress />;
    } else {
      return this.renderTestList();
    }
  }

  renderTestList() {
    return (
      <div>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}
        />
        <LinkWalkerAddTest
          organisationName={this.props.context.currentOrganisation.name}
          notify={this.notify}
          fetchLinkWalkerTests={this.props.fetchLinkWalkerTests}
          clients={this.props.clients}
          components={this.state.components}
        />
        <LinkWalkerTestList
          tests={this.props.tests}
          fetchLinkWalkerTests={this.props.fetchLinkWalkerTests}
          organisationName={this.props.context.currentOrganisation.name}
          notify={this.notify}
        />
      </div>
    );
  }
}

LinkWalkerContainer.defaultProps = {
  clients: [],
  tests: []
};

LinkWalkerContainer.propTypes = {
  classes: PropTypes.object,
  clients: PropTypes.array,
  context: PropTypes.object.isRequired,
  fetchClients: PropTypes.func.isRequired,
  fetchLinkWalkerTests: PropTypes.func.isRequired,
  tests: PropTypes.array
};

function mapStateToProps(state) {
  return {
    tests: state.linkwalker.tests,
    clients: state.client.clients
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLinkWalkerTests: fetchLinkWalkerTests,
      fetchClients: fetchClients
    },
    dispatch
  );
}

export default (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withContext(LinkWalkerContainer))
);
