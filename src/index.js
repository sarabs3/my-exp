import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter} from 'react-router-dom'
import store from "./store";
import App from './app'

const rootEl = document.getElementById("root");

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div style={{ padding: 15 }}>
        <App />
      </div>
    </Provider>
  </BrowserRouter>,
  rootEl
);
