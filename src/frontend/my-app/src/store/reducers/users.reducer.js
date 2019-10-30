import {REMOVE_USER,VIEW_USERS_SELECTVIEW,ADD_USER,VIEW_USERS, VIEW_USER, EDIT_USER} from '../actions/types';

//state inicial, cada reducer debe tener su propio state.
const initialState= {
    users: [],
    user: {user:{}},
    usersSelectView: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case VIEW_USERS:
            return{
                ...state,
                users: action.payload
            }
        case VIEW_USERS_SELECTVIEW:
                return{
                    ...state,
                    usersSelectView: action.payload
                }
        case REMOVE_USER:
            return{
                ...state,
                users: state.users.filter(user=>user.user.id !== action.payload)
            }
        case ADD_USER:
            return{
                ...state,
                users: [...state.users, action.payload]
            }
        case VIEW_USER:
            return{
                ...state,
                user: action.payload
            }
        case EDIT_USER:
            return{
                ...state,
                users: state.users.map(
                       user=>user.user.id === action.payload.user.id
                       ? (user = action.payload)
                       : user
                )
            }                                   
        default:
            return state;
    }
}

export default usersReducer;