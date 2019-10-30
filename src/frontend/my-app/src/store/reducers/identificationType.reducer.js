import {VIEW_IDENTIFICATION} from '../actions/types';

//state inicial, cada reducer debe tener su propio state.
const initialState= {
    identificationType: [],
}

const identificationTypeReducer = (state = initialState, action) => {
    switch(action.type){
        case VIEW_IDENTIFICATION:
            return{
                ...state,
                identificationType: action.payload
            }
                             
        default:
            return state;
    }
}

export default identificationTypeReducer;