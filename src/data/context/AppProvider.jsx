import React, { Component } from "react";
import AppContext from "./AppContext";
import ContactApi from "../api/ContactApi";
import LoadingProgress from "../../common/status/LoadingProgress";
import PropTypes from "prop-types";

import { Cookies, withCookies } from "react-cookie";

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrganisation: undefined,
      organisations: undefined,
      setCurrentOrganisation: organisation => {
        this.setCurrentOrganisation(organisation);
      },
      refresh: () => {
        this.refreshState();
      }
    };
  }

  componentDidMount() {
    this.refreshState();
  }

  setCurrentOrganisation = organisation => {
    const { cookies } = this.props;
    cookies.set("organisation", organisation, { path: "/" });
    this.setState({ currentOrganisation: organisation });
  };

  refreshState = () => {
    const { cookies } = this.props;

    ContactApi.fetchContactOrganisatons()
      .then(response => {
        return response.json();
      })
      .then(json => {
        const cookieOrganisation = cookies.get("organisation") || json[0];
        const updatedOrganisation = json.filter(
          org => org.dn === cookieOrganisation.dn
        )[0];
        cookies.set("organisation", updatedOrganisation, { path: "/" });
        this.setState({
          organisations: json,
          currentOrganisation: updatedOrganisation
        });
      });
  };

  render() {
    if (
      this.state.organisations === undefined ||
      this.state.currentOrganisation === undefined
    ) {
      return <LoadingProgress />;
    } else {
      return (
        <AppContext.Provider value={this.state}>
          {this.props.children}
        </AppContext.Provider>
      );
    }
  }
}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired,
  cookies: PropTypes.instanceOf(Cookies).isRequired
};

export default withCookies(AppProvider);
