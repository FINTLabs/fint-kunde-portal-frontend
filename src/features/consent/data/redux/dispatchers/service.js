// import ConsentApi from "../../ConsentApi";
// import {createServiceSuccess, fetchServiceError, fetchServiceSuccess} from "../actions/service"
//
// export function fetchServices() {
//
//     return (dispatch) => {
//         return ConsentApi.getServices().then(([response, json]) => {
//             if (response.status === 200) {
//                 dispatch(fetchServiceSuccess(json));
//             } else {
//                 dispatch(fetchServiceError());
//             }
//         })
//     }
// }
//
// export function createService(name) {
//     console.log("jennifer - in create policy dispatcher",name);
//     return function (dispatch) {
//         return ConsentApi.createService(name).then(response => {
//             dispatch(createServiceSuccess(response));
//             return response;
//         }).catch(error => {
//             throw (error);
//         });
//     };
// }

import { createServiceSuccess, fetchServiceError, fetchServiceSuccess } from "../actions/service";
// service
export const servicesData = [
    {id:1, name: "Lånekassen", bId: [1,2,3] },
    {id:2, name: "FPVS", bId: [2,4]},
];
// Assuming you have a const named "servicesData" containing the service data
export function fetchServices() {
    console.log("jennifer fetch services");
    return (dispatch) => {
        // Simulate fetching data from the const
        const json = servicesData;

        if (json) {
            dispatch(fetchServiceSuccess(json));
        } else {
            dispatch(fetchServiceError());
        }
    };
}

export function createService(name) {
    console.log("jennifer - in create policy dispatcher", name);
    return function (dispatch) {
        // Simulate creating a service and returning the response
        const response = { /* Add the necessary data here */ };

        dispatch(createServiceSuccess(response));
        return response;
    };
}
