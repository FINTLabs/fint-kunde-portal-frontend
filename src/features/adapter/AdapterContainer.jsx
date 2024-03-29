import React from "react";
import { styled } from "@mui/material/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LoadingProgress from "../../common/status/LoadingProgress";
import {
  createAdapter,
  deleteAdapter,
  fetchAdapters,
  updateAdapter
} from "../../data/redux/dispatchers/adapter";
import AdapterList from "./AdapterList";
import AdapterAdd from "./add/AdapterAdd";
import { withContext } from "../../data/context/withContext";
import AutoHideNotification from "../../common/notification/AutoHideNotification";

const PREFIX = 'AdapterContainer';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {}
}));

class AdapterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adapterAdded: false,
      notify: false,
      notifyMessage: ""
    };
  }

  componentDidMount() {
    this.props.fetchAdapters(this.props.context.currentOrganisation.name);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.context !== this.props.context) {
      this.props.fetchAdapters(this.props.context.currentOrganisation.name);
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

  afterAddAdapter = () => {
    this.props.fetchAdapters(this.props.context.currentOrganisation.name);
  };

  render() {
    if (
      this.props.adapters === undefined ||
      this.props.context.currentOrganisation === undefined
    ) {
      return <LoadingProgress />;
    } else {
      return this.renderAdapters();
    }
  }

  renderAdapters() {
    return (
      <Root className={classes.root}>
        <AutoHideNotification
          showNotification={this.state.notify}
          message={this.state.notifyMessage}
          onClose={this.onCloseNotification}
        />

        <AdapterList
          adapters={this.props.adapters}
          updateAdapter={this.props.updateAdapter}
          deleteAdapter={this.props.deleteAdapter}
        />
        <AdapterAdd
          organisation={this.props.context.currentOrganisation}
          notify={this.notify}
          afterAdd={this.afterAddAdapter}
        />
      </Root>
    );
  }
}

AdapterContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    adapters: state.adapter.adapters,
    components: state.component.components
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAdapters: fetchAdapters,
      updateAdapter: updateAdapter,
      deleteAdapter: deleteAdapter,
      createAdapter: createAdapter
    },
    dispatch
  );
}

export default (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withContext(AdapterContainer))
);
