import {VIEW_USERS, REMOVE_USER, ADD_USER, VIEW_USER, EDIT_USER,VIEW_USERS_SELECTVIEW} from './types';
import axios from 'axios';

var URLService = window.env.SERVICE_ENTERPRISE;

export const getAllUsers = () => async dispatch =>
{
    const getAllUsers = await axios.get(URLService+"User")
    dispatch({
        type: VIEW_USERS,
        payload: getAllUsers.data
    })
    
}

export const getAllProfessionalSelectView = () => async dispatch =>
{
    const getAllProfessionalSelectView = await axios.get(URLService+"User/SelectView")
    dispatch({
        type: VIEW_USERS_SELECTVIEW,
        payload: getAllProfessionalSelectView.data
    })
    
} 
export const deleteUser = id => async dispatch =>
{
    await axios.delete(URLService+"User/"+id)
    .then(() => {
        dispatch({
            type: REMOVE_USER,
            payload: id
        })
    })
}

export const addUser = user => async dispatch =>
{
    await axios.post(URLService+"User",user)
    .then((response) => {
        dispatch({
            type: ADD_USER,
            payload: response.data.result
        })
    })
}

export const editUser = user => async dispatch =>
{
    await axios.put(URLService+"User",user)
    .then((response) => {
        dispatch({
            type: EDIT_USER,
            payload: response.data.result
        })
    });
}

export const getUserById = id => async dispatch =>
{
    const getUserById = await axios.get(URLService+"User/"+id)
    dispatch({
        type: VIEW_USER,
        payload: getUserById.data
    })
}