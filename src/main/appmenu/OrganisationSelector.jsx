import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { Button, Menu, MenuItem } from "@mui/material";

import OrganisationIcon from "@mui/icons-material/Domain";
import { withContext } from "../../data/context/withContext";

const PREFIX = 'OrganisationSelector';

const classes = {
  root: `${PREFIX}-root`,
  organsationIcon: `${PREFIX}-organsationIcon`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    marginRight: theme.spacing(1)
  },

  [`& .${classes.organsationIcon}`]: {
    marginLeft: theme.spacing(1)
  }
}));

class OrganisationSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      organisations: [],
      selectedOrganisation: {}
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = organisation => {
    if (organisation.dn) {
      this.setState({ selectedOrganisation: organisation });
      this.props.context.setCurrentOrganisation(organisation);
    }
    this.setState({ anchorEl: null });
  };

  render() {
    const { } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    if (this.props.context.organisations.length > 0) {
      return (
        <Root className={classes.root} id={"organisationSelector"}>
          <Button
            aria-owns={open ? "menu-appbar" : null}
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            {this.props.context.currentOrganisation
              ? this.props.context.currentOrganisation.displayName
              : "Velg organisasjon"}
            <OrganisationIcon className={classes.organsationIcon} />
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={open}
            onClose={this.handleClose}
          >
            {this.props.context.organisations.map(organisation => (
              <MenuItem
                key={organisation.dn}
                onClick={() => this.handleClose(organisation)}
                id={organisation.orgNumber}
              >
                {organisation.displayName}
              </MenuItem>
            ))}
          </Menu>
        </Root>
      );
    } else {
      return <div />;
    }
  }
}

OrganisationSelector.propTypes = {
  classes: PropTypes.any
};

export default (withContext(OrganisationSelector));
