import {VIEW_PATIENTS, REMOVE_PATIENT, ADD_PATIENT, VIEW_PATIENT,VIEW_PATIENT_CUSTOMER, EDIT_PATIENT,VIEW_PATIENTS_SELECTVIEW} from './types';
import axios from 'axios';

var URLService = window.env.SERVICE_ENTERPRISE;

export const getAllPatients = () => async dispatch =>
{
    const getAllPatients = await axios.get(URLService+"Patient")
    dispatch({
        type: VIEW_PATIENTS,
        payload: getAllPatients.data
    })
    
}

export const getAllPatientsSelectView = () => async dispatch =>
{
    const getAllPatientsSelectView = await axios.get(URLService+"Patient/SelectView")
    dispatch({
        type: VIEW_PATIENTS_SELECTVIEW,
        payload: getAllPatientsSelectView.data
    })
    
}

export const deletePatient = id => async dispatch =>
{
    await axios.delete(URLService+"Patient/"+id)
    .then(() => {
        dispatch({
            type: REMOVE_PATIENT,
            payload: id
        })
    })
}

export const addPatient = patient => async dispatch =>
{
    await axios.post(URLService+"Patient",patient)
    .then((response) => {
        dispatch({
            type: ADD_PATIENT,
            payload: response.data
        })
    })
}

export const editPatient = client => async dispatch =>
{
    await axios.put(URLService+"Patient",client)
    .then((response) => {
        dispatch({
            type: EDIT_PATIENT,
            payload: response.data
        })
    });
}

export const getPatientById = id => async dispatch =>
{
    const getPatientById = await axios.get(URLService+"Patient/"+id)
    dispatch({
        type: VIEW_PATIENT,
        payload: getPatientById.data
    })
}

export const getPatientByCustomerId = id => async dispatch =>
{
    const getPatientById = await axios.get(URLService+"Patient/GetByCustomerId/"+id)
    dispatch({
        type: VIEW_PATIENT_CUSTOMER,
        payload: getPatientById.data
    })
}