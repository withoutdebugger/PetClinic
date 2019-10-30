import {VIEW_QUERYTYPES} from './types';
import axios from 'axios';

var URLService = window.env.SERVICE_ENTERPRISE;

export const getAllQueryTypes = () => async dispatch =>
{
    const getAllQueryTypes = await axios.get(URLService+"QueryTypes")
    dispatch({
        type: VIEW_QUERYTYPES,
        payload: getAllQueryTypes.data
    })
    
}
