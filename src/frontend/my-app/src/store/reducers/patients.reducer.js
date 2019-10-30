import {VIEW_PATIENTS,VIEW_PATIENT_CUSTOMER, REMOVE_PATIENT, ADD_PATIENT, VIEW_PATIENT, EDIT_PATIENT,VIEW_PATIENTS_SELECTVIEW} from '../actions/types';

//state inicial, cada reducer debe tener su propio state.
const initialState= {
    patients: [],
    patient: {},
    patientCustomer: [],
    patientsSelectView: []
}

const patientsReducer = (state = initialState, action) => {
    switch(action.type){
        case VIEW_PATIENTS:
            return{
                ...state,
                patients: action.payload
            }
        case VIEW_PATIENTS_SELECTVIEW:
            return{
                ...state,
                patientsSelectView: action.payload
            }
        case REMOVE_PATIENT:
            return{
                ...state,
                patients: state.patients.filter(patient=>patient.patientId !== action.payload)
            }
        case ADD_PATIENT:
            return{
                ...state,
                patients: [...state.patients, action.payload]
            }
        case VIEW_PATIENT:
            return{
                ...state,
                patient: action.payload
            }
        case VIEW_PATIENT_CUSTOMER:
            return{
                ...state,
                patientCustomer: action.payload
            }
        case EDIT_PATIENT:
            return{
                ...state,
                clients: state.patients.map(
                       patient=>patient.patientId === action.payload.patientId
                       ? (patient = action.payload)
                       : patient
                )
            }                                   
        default:
            return state;
    }
}

export default patientsReducer;