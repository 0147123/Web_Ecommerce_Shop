import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers'

const initialState = {
  auth: {
    user: null,
    token: null
  }
}

const store = createStore(reducers, initialState, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);
