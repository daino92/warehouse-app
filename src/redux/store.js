import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore} from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),  
      
);

export const store = createStore(rootReducer, enhancer);
export const persistor = persistStore(store);

export default {store, persistor};