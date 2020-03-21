import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import Posts from "./Posts";
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