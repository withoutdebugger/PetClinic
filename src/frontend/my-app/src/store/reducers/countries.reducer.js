import {VIEW_COUNTRIES} from '../actions/types';

//state inicial, cada reducer debe tener su propio state.
const initialState= {
    countries: [],
}

const countriesReducer = (state = initialState, action) => {
    switch(action.type){
        case VIEW_COUNTRIES:
            return{
                ...state,
                countries: action.payload
            }
                             
        default:
            return state;
    }
}

export default countriesReducer;