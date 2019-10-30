import {VIEW_IDENTIFICATION} from './types';
import axios from 'axios';

var URLService = window.env.SERVICE_ENTERPRISE;

export const getAllIdentificationType = () => async dispatch =>
{
    const getAllIdentificationType = await axios.get(URLService+"IdentificationsTypes")
    dispatch({
        type: VIEW_IDENTIFICATION,
        payload: getAllIdentificationType.data
    })
    
}
