import {
    ADD_ACCESS_PACKAGE,
    GET_ACCESS_PACKAGES,
    UPDATE_ACCESS_PACKAGES,
    UPDATE_SELECTED_COMPONENTS,
    UPDATE_SELECTED_FOR_EDITING_PACKAGE
} from "../actions/types";

export default function client(state = [], action) {
    switch (action.type) {
        case GET_ACCESS_PACKAGES:
            return {
                ...state, accessPackages: [
                    {
                        id: "full_tilgang_til_alt_ap",
                        shortDescription: "Full Tilgang til alt",
                        name: "full_tilgang_til_alt_ap",
                        selectedComponents: []
                    },
                    {
                        id: "visma_inschool_ap",
                        shortDescription: "Visma Inschool tilgang",
                        name: "visma_inschool_ap",
                        selectedComponents: []
                    },
                    {
                        id: "vigo_bas_ap",
                        shortDescription: "Vigo BAS-tilgang",
                        name: "vigo_bas_ap",
                        selectedComponents: []
                    }
                ],
            };
        case ADD_ACCESS_PACKAGE:
            return {
                ...state, accessPackages: action.payload
            };
        case UPDATE_ACCESS_PACKAGES:
            return {
                ...state, accessPackages: action.payload
            };
        case UPDATE_SELECTED_FOR_EDITING_PACKAGE:
            return {
                ...state, selectedForEditing: action.payload
            };
        case UPDATE_SELECTED_COMPONENTS:
            return {
                ...state, accessPackages: action.payload
            };
        default:
            return state
    }
}