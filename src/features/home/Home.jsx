import React, {useContext} from 'react';
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import {hasRoleInCurrentOrganisation} from "../../common/authorization/role-utilities";
import AppContext from "../../data/context/AppContext";
import Box from "@material-ui/core/Box";
import useFeatureEnabled from "../../common/feature-toggle/useFeatureEnabled";

const Home = () => {
    const me = useSelector(state => state.me.me);
    const currentOrganisation = useContext(AppContext).currentOrganisation.name;
    const isRoleFeatureEnabled = useFeatureEnabled("roles");

    if (isRoleFeatureEnabled) {
        if (hasRoleInCurrentOrganisation(me, currentOrganisation)) {
            return <Redirect to="/dashboard"/>;
        }
        else {
            return (
                <Box mt={5} display="flex" justifyContent="center">
                    <FeatureHelperText>
                        <p>
                            Du har ingen tilganger i kundeportalen. Ta kontakt med FINT
                            administratoren i
                            organisasjonen din.
                        </p>
                    </FeatureHelperText>
                </Box>
            );
        }
    }

    return <Redirect to="/dashboard"/>;
};

export default Home;
