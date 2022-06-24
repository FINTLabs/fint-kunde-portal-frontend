import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Divider, Typography, withStyles} from "@material-ui/core";
import LoadingProgress from "../../common/status/LoadingProgress";
import {fetchServices,createService} from "./data/redux/dispatchers/service";
import {createPolicy, fetchPolicies} from "./data/redux/dispatchers/policy";
import {fetchPolicypurpose} from "./data/redux/dispatchers/policypurpose";
import {fetchPersonaldata} from "./data/redux/dispatchers/personaldata";
import ConsentList from "./list/ConsentAccordion";
import ConsentServiceAdd from "./ConsentServiceAddDialog";
import { withContext } from "../../data/context/withContext";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import FeatureHelperText from "../../common/help/FeatureHelperText";
const styles = () => ({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    componentList: {
        width: "75%"
    },
});

class ConsentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notify: false,
            notifyMessage: "",
        };
    }

    componentDidMount() {
        this.props.fetchPolicies();
        this.props.fetchServices();
        this.props.fetchPersonaldata();
        this.props.fetchPolicypurpose(); //todo: change to plural
        // this.props.fetchServices(this.props.context.currentOrganisation.name);
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

    render() {
        if (
            this.props.personaldata === undefined ||
            this.props.services === undefined ||
            this.props.policies === undefined ||
            this.props.policypurpose === undefined ||
            this.props.context.currentOrganisation === undefined
        ) {
            return <LoadingProgress />;
        } else {
            return this.renderConsent();
        }
    }

    renderConsent() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.componentList}>

                    <AutoHideNotification
                        showNotification={this.state.notify}
                        message={this.state.notifyMessage}
                        onClose={this.onCloseNotification}
                    />

                    <FeatureHelperText>
                        <p>
                            Nedenfor er en liste over <strong>tjenester</strong>. Klikk på overskriften for å se en fullstendig liste over behandlinger
                            eller legg til en ny behandlinger.
                        </p>
                        <p>Jennifer Testing 4</p>
                    </FeatureHelperText>
                    <Typography variant="h5" className={classes.title}>
                        Samtykke
                    </Typography>
                    <Divider/>
                    <ConsentList
                        notify={this.notify}
                        services={this.props.services}
                        policies={this.props.policies}
                        policypurpose={this.props.policypurpose}
                        personaldata={this.props.personaldata}
                        createPolicy={this.props.createPolicy}
                    />

                    <ConsentServiceAdd
                        notify={this.notify}
                        createService={this.props.createService}
                    />

                </div>
            </div>
        );
    }
}

ConsentContainer.propTypes = {};

function mapStateToProps(state) {
    return {
        services: state.consent.services,
        policies: state.consent.policies,
        policypurpose: state.consent.policypurpose,
        personaldata: state.consent.personaldata,
        components: state.component.components,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetchServices: fetchServices, // data redux dispatcher services
            fetchPolicies: fetchPolicies,
            fetchPolicypurpose: fetchPolicypurpose,
            fetchPersonaldata: fetchPersonaldata,
            createService: createService,
            createPolicy: createPolicy,
        },
        dispatch
    );
}

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withContext(ConsentContainer))
);