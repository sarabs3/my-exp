import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter} from 'react-router-dom'
import store from "./store";
import App from './app'
import 'antd/dist/antd.css';
import './index.css';

const rootEl = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootEl
);
