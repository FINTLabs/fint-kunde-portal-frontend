import React, {useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import AppMenu from "./appmenu/AppMenu";
import NoGoContainer from "../features/nogo/NoGoContainer";
import {useDispatch, useSelector} from "react-redux";
import {fetchMe} from "../data/redux/dispatchers/me";
import {fetchFeatures} from "../data/redux/dispatchers/features";

const Main = () => {
    const me = useSelector(state => state.me.me);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMe());
        dispatch(fetchFeatures());
    }, [dispatch]);

    function renderAppMenu() {
        return (

            <BrowserRouter basename="/">
                <AppMenu me={me}/>
            </BrowserRouter>

        );
    }

    const contactExists = () => {
        return me !== undefined;
    }

    const contactHasOrganisations = () => {
        return contactExists() && (me.legal.length > 0 || me.technical.length > 0);
    }

    if (contactHasOrganisations()) {
        return renderAppMenu();
    }
    return (
        <NoGoContainer
            contactExists={contactExists()}
            contactHasOrganisations={contactHasOrganisations()}
        />
    );

}

Main.propTypes = {};

export default Main;
