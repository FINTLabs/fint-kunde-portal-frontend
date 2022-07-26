import React from "react";
import { styled } from '@mui/material/styles';
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tooltip
} from "@mui/material";
import PropTypes from "prop-types";
import AdapterApi from "../../../data/api/AdapterApi";
import * as PasswordGenerator from "generate-password";
import GetSecretIcon from "@mui/icons-material/GetApp";
import RefreshIcon from "@mui/icons-material/Refresh";
import { withContext } from "../../../data/context/withContext";
import { Link } from "react-router-dom";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import ContentCopy from "@mui/icons-material/FileCopy";

const PREFIX = 'AdapterTabAuthenticationInformation';

const classes = {
  root: `${PREFIX}-root`,
  oauthSecret: `${PREFIX}-oauthSecret`,
  auth: `${PREFIX}-auth`,
  authSecret: `${PREFIX}-authSecret`,
  close: `${PREFIX}-close`,
  copyAllAuthButtonIcon: `${PREFIX}-copyAllAuthButtonIcon`,
  gotoAssetButton: `${PREFIX}-gotoAssetButton`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  },

  [`& .${classes.oauthSecret}`]: {
    width: "100%",
    padding: "10px"
  },

  [`& .${classes.auth}`]: {
    marginTop: "0px",
    marginBottom: "10px",
    padding: "10px"
  },

  [`& .${classes.authSecret}`]: {
    width: "100%",
    padding: "10px"
  },

  [`& .${classes.close}`]: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },

  [`& .${classes.copyAllAuthButtonIcon}`]: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2)
  },

  [`& .${classes.gotoAssetButton}`]: {
    marginTop: theme.spacing(1)
  }
}));

class AdapterTabAuthenticationInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allAuthInfo: {
        username: this.props.adapter.name,
        password: "**********",
        clientId: this.props.adapter.clientId,
        openIdSecret: " ",
        scope: "fint-client",
        idpUri: "https://idp.felleskomponent.no/nidp/oauth/nam/token",
        assetIds: this.props.adapter.assetIds
      },
      askToResetPassword: false,
      message: ""
    };
  }

  getOpenIdSecret = () => {
    AdapterApi.getOpenIdSecret(
      this.props.adapter,
      this.props.context.currentOrganisation.name
    ).then(data => {
      let allAuthInfo = this.state.allAuthInfo;
      allAuthInfo.openIdSecret = data;
      this.setState({
        allAuthInfo: allAuthInfo
      });
    });
  };

  generatePassord = () => {
    return PasswordGenerator.generate({
      length: 32,
      numbers: true,
      symbols: false,
      strict: true
    });
  };

  setPassword = () => {
    let password = this.generatePassord();

    AdapterApi.setPassword(
      this.props.adapter,
      password,
      this.props.context.currentOrganisation.name
    ).then(response => {
      if (response.status === 200) {
        let allAuthInfo = this.state.allAuthInfo;
        allAuthInfo.password = password;
        this.setState({
          allAuthInfo: allAuthInfo
        });
      }
    });
  };

  askToResetPassword = () => {
    this.setState({
      askToResetPassword: true,
      message:
        "Er du sikker på at du vil sette nytt passord? Hvis du gjør det må alle som " +
        "bruker autentiseringsinformasjonen få det nye passordet og konfigurere tjenesten sin på nytt!"
    });
  };

  onCloseAskResetPassword = confirmed => {
    this.setState({
      askToResetPassword: false
    });

    if (confirmed) {
      this.setPassword();
    }
  };

  render() {
    return (
      <Root>
        <WarningMessageBox
          show={this.state.askToResetPassword}
          message={this.state.message}
          onClose={this.onCloseAskResetPassword}
        />
        <FormControl className={classes.authSecret} id={"nameFormControl"}>
          <InputLabel htmlFor="name">Brukernavn</InputLabel>

          <Input
            margin="dense"
            id="name"
            name="name"
            value={this.props.adapter.name}
            disabled
            endAdornment={
              <InputAdornment position="end">
                <CopyToClipboard
                  text={this.props.adapter.name}
                  onCopy={() => this.props.notify("Kopiert")}
                >
                  <IconButton>
                    <ContentCopy />
                  </IconButton>
                </CopyToClipboard>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl className={classes.authSecret}>
          <InputLabel htmlFor="adornment-password">Passord</InputLabel>
          <Input
              disabled
            margin="dense"
            id="adornment-password"
            type={
              this.state.allAuthInfo.password === "topsecret"
                ? "password"
                : "text"
            }
            value={this.state.allAuthInfo.password}
            endAdornment={
              <InputAdornment position="end">
                <Tooltip
                  id="tooltip-fab"
                  title="Trykk for å generere nytt passord"
                >
                  <IconButton onClick={() => this.askToResetPassword()}>
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <CopyToClipboard
                  text={this.state.allAuthInfo.password}
                  onCopy={() => this.props.notify("Kopiert")}
                >
                  <IconButton
                    disabled={this.state.allAuthInfo.password === "topsecret"}
                  >
                    <ContentCopy />
                  </IconButton>
                </CopyToClipboard>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={classes.oauthSecret}>
          <InputLabel htmlFor="name">Klient ID</InputLabel>

          <Input
            margin="dense"
            id="id"
            name="name"
            value={this.props.adapter.clientId}
            disabled
            endAdornment={
              <InputAdornment position="end">
                <CopyToClipboard
                  text={this.state.allAuthInfo.clientId}
                  onCopy={() => this.props.notify("Kopiert")}
                >
                  <IconButton>
                    <ContentCopy />
                  </IconButton>
                </CopyToClipboard>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={classes.oauthSecret}>
          <InputLabel htmlFor="adornment-password">
            Klient Hemmelighet
          </InputLabel>
          <Input
            id="client-secret"
            disabled
            margin="dense"
            value={this.state.allAuthInfo.openIdSecret}
            multiline
            rows="2"
            endAdornment={
              <InputAdornment position="end">
                <Tooltip
                  id="tooltip-fab"
                  title="Trykk for å hente hemmligheten"
                >
                  <IconButton onClick={() => this.getOpenIdSecret()}>
                    <GetSecretIcon />
                  </IconButton>
                </Tooltip>
                <CopyToClipboard
                  text={this.state.allAuthInfo.openIdSecret}
                  onCopy={() => this.props.notify("Kopiert")}
                >
                  <IconButton>
                    <ContentCopy />
                  </IconButton>
                </CopyToClipboard>
              </InputAdornment>
            }
          />
        </FormControl>

        {this.props.adapter.assetIds.length > 0 ? (
          <FormControl className={classes.authSecret}>
            <InputLabel htmlFor="name">RessursId'er</InputLabel>

            <Input
              margin="dense"
              id="asset-id"
              name="asset-id"
              value={
                this.props.adapter.assetIds
                  ? this.props.adapter.assetIds
                  : "Ingen ressursId er tilknyttet enda!"
              }
              disabled
              endAdornment={
                <InputAdornment position="end">
                  <CopyToClipboard
                    text={this.props.adapter.assetIds}
                    onCopy={() => this.props.notify("Kopiert")}
                  >
                    <IconButton>
                      <ContentCopy />
                    </IconButton>
                  </CopyToClipboard>
                </InputAdornment>
              }
            />
          </FormControl>
        ) : (
          <Button
            className={classes.gotoAssetButton}
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            component={Link}
            to="/assets"
          >
            Adapteret har ikke tilordnet en ressursId. Klikk her for å legge til
            en ressursId.
          </Button>
        )}

        <CopyToClipboard
          text={JSON.stringify(this.state.allAuthInfo, null, 2)}
          onCopy={() => this.props.notify("Kopiert")}
        >
          <Button variant="contained" className={classes.copyAllAuthButtonIcon} id={"copyAllAuthInformation"}>
            <ContentCopy />
            Kopier autentiseringsinformasjon
          </Button>
        </CopyToClipboard>
      </Root>
    );
  }
}

AdapterTabAuthenticationInformation.propTypes = {
  adapter: PropTypes.object.isRequired,
  notify: PropTypes.func.isRequired
};

export default (
  withContext(AdapterTabAuthenticationInformation)
);
