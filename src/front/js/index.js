//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import jQ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-jquery/dist/js/bootstrap.js";
import "swiper/swiper.scss";

//include your index.scss file into the bundle
import "../styles/index.scss";
import "../styles/chat.scss";
import "../styles/colours.scss";
import "../styles/list-of-women.scss";
import "../styles/navbar.scss";
import "../styles/editProfile.scss";
import "../styles/card.scss";
import "../styles/pending-users-cards.scss";
// css

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
