import {
    FETCH_PERSONALDATA_SUCCESS,
    FETCH_POLICY_SUCCESS,
    FETCH_POLICYPURPOSE_SUCCESS,
    FETCH_SERVICE_SUCCESS,
    CREATE_POLICY_SUCCESS,
    CREATE_SERVICE_SUCCESS,
} from "../actions/types";

export default function consent(state = [], action) {

    switch (action.type) {

        case FETCH_SERVICE_SUCCESS: {
            return {
                ...state, services: action.payload
            }
        }
        case FETCH_POLICY_SUCCESS: {
            return {
                ...state, policies: action.payload
            }
        }
        case FETCH_POLICYPURPOSE_SUCCESS: {
            return {
                ...state, policypurpose: action.payload
            }
        }
        case FETCH_PERSONALDATA_SUCCESS: {
            return {
                ...state, personaldata: action.payload
            }
        }
        case CREATE_POLICY_SUCCESS:
            console.log("jennifer", action.payload.serviceId);
            //TODO return a full list of services ??
            const service = state.services.find(element => element.systemId === action.payload.serviceId);
            service.policySystemIds.push("5999");
            return {
                ...state, policies: [...state.policies, action.payload]
                /*,services: [...state.services,
                    {
                        "name": "test",
                        "systemId": "1000000",
                        "policySystemIds": [
                            "1999",
                            "2999",
                            "5999"
                        ]
                    }
                    ]*/
            };
        case CREATE_SERVICE_SUCCESS:
            return {
                ...state, services: [...state.services, action.payload]
            };
        default:
            return state
    }
}