import settings from './settings.middleware.js'
import themes from './themes.middleware.js';
import thunk from 'redux-thunk';

export default [
    settings,
    themes,
    thunk
]