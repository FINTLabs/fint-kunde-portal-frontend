import React from "react";
import Button from "@material-ui/core/Button";
import LogApi from "../../data/api/LogApi";
import LogList from "./LogList";
import { Input, Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { withContext } from "../../data/context/withContext";
import Search from "@material-ui/icons/Search";
import ComponentSelector from "../../common/test/ComponentSelector";
import ComponentApi from "../../data/api/ComponentApi";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    paddingLeft: theme.spacing(50),
    paddingBottom: theme.spacing(1)
  },
  searchInput: {
    width: "50%"
  }
});

class LogContainer extends React.Component {
  onSearch = searchString => {
    //let log = this.props.log;
  };

  onChangeSearch = event => {
    this.setState({
      searchString: event.target.value
    });
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      log: [],
      searchString: "",
      loading: false,
      components: [],
      endpoint: ""
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

  componentDidMount() {
    const { currentOrganisation } = this.props.context;
    //this.props.fetchClients(currentOrganisation.name);
    this.getOrganisationComponents(currentOrganisation.name);
  }

  handleChange = e => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  };

  searchLog = () => {
    this.setState({
      loading: true
    });
    let source = this.state.endpoint.substring(1).replace("/", "-");
    LogApi.fetchLog("fintlabs.no", `${source}/${this.state.searchString}`).then(response => {
      this.setState({
        log: response[1],
        loading: false
      });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h5" className={classes.title}>
          Logs
        </Typography>
        <div className={classes.root}>
          <ComponentSelector
            components={this.state.components}
            handleChange={this.handleChange}
            name={"endpoint"}
            value={this.state.endpoint}
          />
          <Input
            autoFocus
            value={this.state.searchString}
            className={classes.searchInput}
            placeholder="Søk etter log"
            onChange={this.onChangeSearch}
            onKeyUp={() => this.onSearch(this.state.query)}
          />
          <Button
            onClick={() => this.searchLog(this.state.query)}
            color="primary"
          >
            <Search />
          </Button>
        </div>
        <div className={classes.root}>
          <LogList log={this.state.log} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

LogContainer.propTypes = {
  classes: PropTypes.any.isRequired,
  log: PropTypes.any.isRequired,
  fetchLog: PropTypes.any.isRequired,
  loading: PropTypes.any.isRequired
};

export default withStyles(styles)(withContext(LogContainer));
