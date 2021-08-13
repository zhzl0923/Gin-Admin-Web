import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles/index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
