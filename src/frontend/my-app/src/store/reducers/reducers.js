import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer.js';
import themesReducer from './themes.reducers.js';
import rolesReducer from './roles.reducer.js';
import usersReducer from './users.reducer';
import clientsReducer from './clients.reducer.js';
import countriesReducer from './countries.reducer';
import identificationTypeReducer from './identificationType.reducer.js';
import patientsReducer from './patients.reducer.js';
import queryTypesReducer from './queryTypes.reducer.js';
import scheduleReducer from './schedule.reducer.js';

export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    users: usersReducer,
    roles: rolesReducer,
    clients: clientsReducer,
    countries: countriesReducer,
    patients: patientsReducer,
    identificationType: identificationTypeReducer,
    queryTypes: queryTypesReducer,
    schedules: scheduleReducer
});
