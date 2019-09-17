import {VIEW_ROLES, VIEW_ROLES_USERID} from '../actions/types';

//state inicial, cada reducer debe tener su propio state.
const initialState= {
    roles: [],
    rolesUserId: []
}

const rolesReducer = (state = initialState, action) => {
    switch(action.type){
        case VIEW_ROLES:
            return{
                ...state,
                roles: action.payload
            }
        case VIEW_ROLES_USERID:
            return{
                ...state,
                rolesUserId: action.payload
        }   
        default:
            return state;
    }
}

export default rolesReducer;