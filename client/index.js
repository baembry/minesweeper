import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.jsx";
window.addEventListener("getProduct", event => {
  alert("I'm the carousel, and I know you clicked the search button");
});
ReactDOM.render(<App />, document.getElementById("carousel"));
