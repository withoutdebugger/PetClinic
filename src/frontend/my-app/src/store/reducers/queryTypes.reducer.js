import {VIEW_QUERYTYPES} from '../actions/types';

//state inicial, cada reducer debe tener su propio state.
const initialState= {
    queryTypes: [],
}

const queryTypesReducer = (state = initialState, action) => {
    switch(action.type){
        case VIEW_QUERYTYPES:
            return{
                ...state,
                queryTypes: action.payload
            }
                             
        default:
            return state;
    }
}

export default queryTypesReducer;