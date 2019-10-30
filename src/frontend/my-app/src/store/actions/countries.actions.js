import {VIEW_COUNTRIES} from './types';
import axios from 'axios';

var URLService = window.env.SERVICE_ENTERPRISE;

export const getAllCountries = () => async dispatch =>
{
    const getAllCountries = await axios.get(URLService+"Countries")
    dispatch({
        type: VIEW_COUNTRIES,
        payload: getAllCountries.data
    })
    
}
