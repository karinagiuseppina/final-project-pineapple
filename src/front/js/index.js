//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";

//include your index.scss file into the bundle
import "../styles/index.scss";
import "../styles/chat.scss";
import "../styles/colours.scss";
import "../styles/list-of-women.scss";
import "../styles/navbar.scss";
import "../styles/editProfile.scss";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
