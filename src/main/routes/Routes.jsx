import React from "react";
import ClientsContainer from "../../features/clients/ClientsContainer";
import Dashboard from "../../features/dashboard/Dashboard";
import ComponentContainer from "../../features/component/ComponentContainer";
import AdapterContainer from "../../features/adapter/AdapterContainer";
import ContactContainer from "../../features/contact/ContactContainer";
import AssetContainer from "../../features/asset/AssetContainer";
import RoleAuthorizedRoute from "../../common/authorization/RoleAuthorizedRoute";
import {Route} from "react-router-dom";
import Home from "../../features/home/Home";
import useFeatureEnabled from "../../common/feature-toggle/useFeatureEnabled";
import LogContainer from "../../features/logs/LogContainer";
import LinkWalkerContainer from "../../features/link-walker/LinkWalkerContainer";
import BasicTestContainer from "../../features/basic-test/BasicTestContainer";
import SupportContainer from "../../features/support/SupportContainer";
import AccessPackageContainer from "../../features/access-package/AccessPackageContainer";
import ConsentContainer from "../../features/consent/ConsentContainer"

function Routes() {
    const featureAuditLogEnabled = useFeatureEnabled("audit-log");
    const featureSamtykkeEnabled = useFeatureEnabled("samtykke-admin");

    return (
        <div>
            <Route exact path="/" component={Home}/>
            <RoleAuthorizedRoute path="/dashboard" component={Dashboard} role="ROLE_DASHBOARD"/>
            <RoleAuthorizedRoute path="/clients" component={ClientsContainer} role="ROLE_CLIENT"/>
            <RoleAuthorizedRoute path="/adapters" component={AdapterContainer} role="ROLE_ADAPTER"/>
            <RoleAuthorizedRoute path="/contacts" component={ContactContainer}
                                 role="ROLE_ORGANISATION"/>
            <RoleAuthorizedRoute path="/assets" component={AssetContainer} role="ROLE_ASSET"/>
            <RoleAuthorizedRoute path="/components" component={ComponentContainer}
                                 role="ROLE_COMPONENT"/>
           {featureAuditLogEnabled &&
            <RoleAuthorizedRoute path="/logs" component={LogContainer} role="ROLE_LOG"/>}
            <RoleAuthorizedRoute path="/test/linkwalker" component={LinkWalkerContainer}
                                 role="ROLE_TEST"/>
            <RoleAuthorizedRoute path="/test/basic" component={BasicTestContainer}
                                 role="ROLE_TEST"/>
            <RoleAuthorizedRoute path="/support/issue" component={SupportContainer}
                                 role="ROLE_SUPPORT"/>
            <RoleAuthorizedRoute path="/access_package" component={AccessPackageContainer}
                                 role="ROLE_ACCESS_PACKAGE"/>
            <RoleAuthorizedRoute path="/consent" component={ConsentContainer}
                                                            role="ROLE_DASHBOARD"/>

        </div>
    );
}

export default Routes;
