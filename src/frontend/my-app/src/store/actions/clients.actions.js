import {VIEW_CLIENTS, REMOVE_CLIENT, ADD_CLIENT, VIEW_CLIENTS_SELECTVIEW,VIEW_CLIENT, EDIT_CLIENT} from './types';
import axios from 'axios';

var URLService = window.env.SERVICE_ENTERPRISE;

export const getAllClients = () => async dispatch =>
{
    const getAllClients = await axios.get(URLService+"Client")
    dispatch({
        type: VIEW_CLIENTS,
        payload: getAllClients.data
    })
    
}


export const getAllClientsSelectView = () => async dispatch =>
{
    const getAllClients = await axios.get(URLService+"Client/SelectView")
    dispatch({
        type: VIEW_CLIENTS_SELECTVIEW,
        payload: getAllClients.data
    })
    
}
export const deleteClient = id => async dispatch =>
{
    await axios.delete(URLService+"Client/"+id)
    .then(() => {
        dispatch({
            type: REMOVE_CLIENT,
            payload: id
        })
    })
}

export const addClient = client => async dispatch =>
{
    await axios.post(URLService+"Client",client)
    .then((response) => {
        dispatch({
            type: ADD_CLIENT,
            payload: response.data
        })
    })
}

export const editClient = client => async dispatch =>
{
    await axios.put(URLService+"Client",client)
    .then((response) => {
        dispatch({
            type: EDIT_CLIENT,
            payload: response.data
        })
    });
}

export const getClientById = id => async dispatch =>
{
    const getClientById = await axios.get(URLService+"Client/"+id)
    dispatch({
        type: VIEW_CLIENT,
        payload: getClientById.data
    })
}