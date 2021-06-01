import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/ko";
// import moment from "moment";

// moment.locale("ru");

ReactDOM.render(
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MuiPickersUtilsProvider>,

  document.getElementById("root")
);
