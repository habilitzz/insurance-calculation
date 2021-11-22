require('file-loader?name=[name].[ext]!../public/index.html');
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import commonReducer from './reducers/common-reducer';
import  productReducer from './reducers/product-reducer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './style/common.css';

import App from './App';

const store = createStore(combineReducers({commonReducer, productReducer}));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
