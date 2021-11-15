import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./Redux/Store/store";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById("root")
);
