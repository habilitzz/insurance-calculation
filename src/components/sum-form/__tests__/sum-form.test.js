import React from 'react';
import ReactDOM  from 'react-dom';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import SumForm from '../sum-form';

const mockStore = configureMockStore();
const store = mockStore({});
it("render summary form", () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<SumForm/>, dev)
  render(<Provider store={store}><SumForm/></Provider>)
})