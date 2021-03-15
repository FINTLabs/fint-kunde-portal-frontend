import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppMenu from "./appmenu/AppMenu";
import MeApi from "../data/api/MeApi";
import NoGoContainer from "../features/nogo/NoGoContainer";
import {useDispatch} from "react-redux";
import {fetchMe} from "../data/redux/dispatchers/me";

const Main = () => {

    const [contactExists, setContactExists] = useState(false);
    const [contactHasOrganisations, setContactHasOrganisations] = useState(false);
    const [me, setMe] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        // TODO: Use redux instead
        MeApi.getMe().then((response) => {
            if (response.status === 200) {
                setMe(response.data);
                setContactExists(true);
                setContactHasOrganisations(response.data.legal.length > 0 || response.data.technical.length > 0);
            } else {
                setContactExists(false);
                setContactHasOrganisations(false);
            }
        });
        dispatch(fetchMe());

    },[dispatch]);

    function renderAppMenu() {
        return (

            <BrowserRouter basename="/">
                <AppMenu me={me}/>
            </BrowserRouter>

        );
    }

    if (contactExists && contactHasOrganisations && me) {
        return renderAppMenu();
    }
    return (
        <NoGoContainer
            contactExists={contactExists}
            contactHasOrganisations={contactHasOrganisations}
        />
    );

}

Main.propTypes = {};

export default Main;
