import { combineReducers } from 'redux';

import settingsReducer from './settings.reducer.js';
import themesReducer from './themes.reducers.js';
import rolesReducer from './roles.reducer.js';
import usersReducer from './users.reducer';

export default combineReducers({
    settings: settingsReducer,
    theme: themesReducer,
    users: usersReducer,
    roles: rolesReducer
});
