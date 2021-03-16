import React from "react";
import {Route} from "react-router-dom";
import ClientsContainer from "../../features/clients/ClientsContainer";
import Dashboard from "../../features/dashboard/Dashboard";
import SupportContainer from "../../features/support/SupportContainer";
import ComponentContainer from "../../features/component/ComponentContainer";
import AdapterContainer from "../../features/adapter/AdapterContainer";
import ContactContainer from "../../features/contact/ContactContainer";
import AssetContainer from "../../features/asset/AssetContainer";
import LogContainer from "../../features/logs/LogContainer";
import LinkWalkerContainer from "../../features/link-walker/LinkWalkerContainer";
import BasicTestContainer from "../../features/basic-test/BasicTestContainer";
import AccessPackageContainer from "../../features/access-package/AccessPackageContainer";
import {useFeatureEnabled} from "@fintlabs/fint-feature-toggle-react";
import RoleAuthorizedRoute from "../../common/authorization/RoleAuthorizedRoute";

function Routes() {
    const featureAuditLogEnabled = useFeatureEnabled("audit-log");

    return (
        <div>
            <Route exact path="/" component={Dashboard}/>
            <RoleAuthorizedRoute path="/clients" component={ClientsContainer} role="ROLE_CLIENT"/>
            <Route path="/adapters" component={AdapterContainer}/>
            <Route path="/contacts" component={ContactContainer}/>
            <Route path="/assets" component={AssetContainer}/>
            <Route path="/components" component={ComponentContainer}/>
            {featureAuditLogEnabled && <Route path="/logs" component={LogContainer}/>}
            <Route path="/test/linkwalker" component={LinkWalkerContainer}/>
            <Route path="/test/basic" component={BasicTestContainer}/>
            <Route path="/support/issue" component={SupportContainer}/>
            <Route path="/access_package" component={AccessPackageContainer}/>
        </div>
    );
}

export default Routes;
