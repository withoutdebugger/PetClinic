import {REMOVE_CLIENT,ADD_CLIENT,VIEW_CLIENTS,VIEW_CLIENTS_SELECTVIEW, VIEW_CLIENT, EDIT_CLIENT} from '../actions/types';

//state inicial, cada reducer debe tener su propio state.
const initialState= {
    clients: [],
    client: {},
    clientsSelectView:[]
}

const clientsReducer = (state = initialState, action) => {
    switch(action.type){
        case VIEW_CLIENTS:
            return{
                ...state,
                clients: action.payload
            }
        case VIEW_CLIENTS_SELECTVIEW:
            return{
                ...state,
                clientsSelectView: action.payload
            }
        case REMOVE_CLIENT:
            return{
                ...state,
                clients: state.clients.filter(client=>client.customerId !== action.payload)
            }
        case ADD_CLIENT:
            return{
                ...state,
                clients: [...state.clients, action.payload]
            }
        case VIEW_CLIENT:
            return{
                ...state,
                client: action.payload
            }
        case EDIT_CLIENT:
            return{
                ...state,
                clients: state.clients.map(
                       client=>client.customerId === action.payload.customerId
                       ? (client = action.payload)
                       : client
                )
            }                                   
        default:
            return state;
    }
}

export default clientsReducer;