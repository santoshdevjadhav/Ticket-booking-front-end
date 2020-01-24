import thunk from 'redux-thunk'
import React from 'react'
import rootReducer from '../container/reducer/index'
import {applyMiddleware,compose,createStore} from 'redux'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);

export  default createStore(rootReducer,enhancer);
