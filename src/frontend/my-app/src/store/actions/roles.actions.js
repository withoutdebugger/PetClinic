import {VIEW_ROLES,VIEW_ROLES_USERID} from './types';
import axios from 'axios';

var URLService = window.env.SERVICE_ENTERPRISE;

export const getAllRoles = () => async dispatch =>
{
    const getAllRoles = await axios.get(URLService+"Role")
    dispatch({
        type: VIEW_ROLES,
        payload: getAllRoles.data
    })
    
}


export const getRolesByUserId = (userId) => async dispatch =>
{
    const getRolesByUserId = await axios.get(URLService+"UserRole/GetRolesByUserId/"+ userId)
    dispatch({
        type: VIEW_ROLES_USERID,
        payload: getRolesByUserId.data
    })
    
}
