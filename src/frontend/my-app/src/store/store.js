import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/reducers';
import middlewares from './middlewares/middlewares'
import thunk from 'redux-thunk';
import { updateTheme } from './middlewares/themes.middleware.js';

import { persistedState, saveState } from './persisted.store.js';

export default function configureStore() {

    const middleware = [thunk];
    const store = createStore(
        reducers,
        persistedState, // second argument overrides the initial state
        compose(applyMiddleware(
            ...middlewares, ...middleware),       
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
            ? a => a
            : window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()        )
    );
    // add a listener that will be invoked on any state change
    store.subscribe(() => {
        saveState(store.getState());
    });
    // Update the initial theme
    updateTheme(store.getState())
    return store;
}