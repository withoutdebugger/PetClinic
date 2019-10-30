import {VIEW_SCHEDULES, ADD_SCHEDULE,EDIT_SCHEDULE,VIEW_SCHEDULE,VIEW_SCHEDULE_GET,REMOVE_SCHEDULE,EDIT_SCHEDULE_INIT} from '../actions/types';

//state inicial, cada reducer debe tener su propio state.
const initialState= {
    schedules: [],
    schedule: {}
}

const scheduleReducer = (state = initialState, action) => {
    switch(action.type){
        case VIEW_SCHEDULES:
            return{
                ...state,
                schedules: action.payload
            }
       
        case ADD_SCHEDULE:
            return{
                ...state,
                schedules: [...state.schedules, action.payload]
            }
        case REMOVE_SCHEDULE:
            debugger;
            return{
                ...state,
                schedules: state.schedules.filter(schedule=>schedule.id !== parseInt(action.payload))
            }
        case VIEW_SCHEDULE:
            return{
                ...state,
                schedule: action.payload
            }
        case VIEW_SCHEDULE_GET:
            return{
                ...state
            }
        case EDIT_SCHEDULE_INIT:
            return{
                ...state
            }
        case EDIT_SCHEDULE:    
        debugger;
        return{
            ...state,
            schedules: state.schedules.map(
                   schedule=>schedule.id === parseInt(action.payload.id)
                   ? (schedule = action.payload)
                   : schedule
            )
        }            
        default:
            return state;
    }
}

export default scheduleReducer;