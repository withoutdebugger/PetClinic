import {ADD_SCHEDULE,VIEW_SCHEDULE,EDIT_SCHEDULE,EDIT_SCHEDULE_INIT,VIEW_SCHEDULES,VIEW_SCHEDULE_GET, REMOVE_SCHEDULE} from './types';
import axios from 'axios';
import scheduleReducer from '../reducers/schedule.reducer';

var URLService = window.env.SERVICE_ENTERPRISE;

export const getAllSchedules = () => async dispatch =>
{
    const getAllSchedules = await axios.get(URLService+"Schedule")
    dispatch({
        type: VIEW_SCHEDULES,
        payload: getAllSchedules.data
    })
    
}
export const addSchedule = schedule => async dispatch =>
{
    await axios.post(URLService+"Schedule",schedule)
    .then((response) => {
        var start = new Date(response.data.start);
        response.data.start = start.setHours(start.getHours() + 3 );
        var end = new Date(response.data.end);
        response.data.end = end.setHours(end.getHours() + 3 );
        dispatch({
            type: ADD_SCHEDULE,
            payload: response.data
        })
    })
}
export function getScheduleById(id)
{
    return(dispatch)=>{
        dispatch(getScheduleToEdit());
        axios.get(URLService+"Schedule/"+id)
        .then(respuesta=>{
           
            dispatch(editScheduleSuccess(respuesta.data));
        }).catch(error=>{
            console.log(error);
        })
    }
}
export const editScheduleSuccess = schedule =>({
        type: VIEW_SCHEDULE,
        payload: schedule
})
export const getScheduleToEdit = () =>({
    type: VIEW_SCHEDULE_GET
})

////////////////////////////////***********************************************/// */
export function editSchedule(schedule)
{
    return(dispatch)=>{
        dispatch(editScheduleInit());
        axios.put(URLService+"Schedule",schedule)
        .then((response) => {
            var start = new Date(response.data.start);
            response.data.start = start.setHours(start.getHours() + 3 );
            var end = new Date(response.data.end);
            response.data.end = end.setHours(end.getHours() + 3 );
            dispatch(editScheduleOk(response.data));
        });
    }
  
}

export const editScheduleOk = schedule =>({
    type: EDIT_SCHEDULE,
    payload: schedule
})

export const editScheduleInit =()=>({
    type:EDIT_SCHEDULE_INIT
})

export const deleteSchedule = id => async dispatch =>
{
    await axios.delete(URLService+"Schedule/"+id)
    .then(() => {
        dispatch({
            type: REMOVE_SCHEDULE,
            payload: id
        })
    })
}

