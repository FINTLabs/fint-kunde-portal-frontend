import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Divider, Typography} from "@mui/material";
import LoadingProgress from "../../common/status/LoadingProgress";
import {createService, fetchServices} from "./data/redux/dispatchers/service";
import {createPolicy, fetchPolicies} from "./data/redux/dispatchers/policy";
import {createPolicypurpose, fetchPolicypurpose} from "./data/redux/dispatchers/policypurpose";
import {fetchPersonaldata} from "./data/redux/dispatchers/personaldata";
import ConsentList from "./list/ConsentAccordion";
import ConsentServiceAdd from "./ConsentServiceAddDialog";
import {withContext} from "../../data/context/withContext";
import AutoHideNotification from "../../common/notification/AutoHideNotification";
import FeatureHelperText from "../../common/help/FeatureHelperText";

class ConsentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notify: false,
            notifyMessage: "",
            // key: 0,
        };
    }

    componentDidMount() {
        this.props.fetchPolicies(this.props.context.currentOrganisation.name);
        this.props.fetchServices(this.props.context.currentOrganisation.name);
        this.props.fetchPersonaldata();
        this.props.fetchPolicypurpose(); //todo: change to plural
    }

    componentDidUpdate(prevProps) {
        // Check if the props have changed (for example, the services array)
        if (this.props.services !== prevProps.services ||
            this.props.policies !== prevProps.policies ||
            this.props.policypurpose !== prevProps.policypurpose ||
            this.props.personaldata !== prevProps.personaldata) {
            // Update the state with the new props
            this.setState({
                services: this.props.services,
                policypurpose: this.props.policypurpose,
                personaldata: this.props.personaldata,
            });
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

    afterChange = () => {
        this.props.fetchPolicies(this.props.context.currentOrganisation.name);
        this.props.fetchServices(this.props.context.currentOrganisation.name);
        this.props.fetchPersonaldata();
        this.props.fetchPolicypurpose();
        // this.setState(prevState => ({
        //     key: prevState.key + 1
        // }));
        console.log("jennifer afterChange");
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
        // const { classes } = this.props;
        return (
            <div >
                <div >

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
                        <p>Klikk på plussikonet for å legge til en nye tjenester eller behandlingsgrunnlag.</p>
                    </FeatureHelperText>
                    <Typography variant="h5" >
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
                        afterChange={this.afterChange}
                        currentOrg={this.props.context.currentOrganisation.name}
                        // key={this.state.key}
                    />

                    <ConsentServiceAdd
                        notify={this.notify}
                        createService={this.props.createService}
                        createPolicypurpose={this.props.createPolicypurpose}
                        afterChange={this.afterChange}
                        currentOrg={this.props.context.currentOrganisation.name}
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
            createPolicypurpose: createPolicypurpose,
            createPolicy: createPolicy,
        },
        dispatch
    );
}

// export default withStyles(styles)(
export default (
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withContext(ConsentContainer))
);