import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import App from './App';

const mockStore = configureMockStore();
const store = mockStore({});
it("render App ", () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<SumForm/>, dev)
  render(<Provider store={store}><App/></Provider>)
})