
export default function client(state = [], action) {
    switch (action.type) {
        case FETCH_CLIENT_REQUEST:
            return state;
        case FETCH_CLIENT_SUCCESS:
            return {
                ...state, clients: action.payload
            };
        case UPDATE_CLIENT_SUCCESS:
            return state;
        case CREATE_CLIENT_SUCCESS:
            return {
                ...state, clients: [...state.clients, action.client]
            };
        case DELETE_CLIENT_SUCCESS:
            return {
                ...state, clients: state.clients.filter(client => action.client !== client)
            };
        default:
            return state
    }
}