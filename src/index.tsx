import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import Posts from "./Posts";
import * as serviceWorker from "./serviceWorker";
import PostDetails from "./PostDetails";

const container = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Posts} />
      <Route path="/posts/:id" component={PostDetails} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(container, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
