import React from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./pages/List";
import Add from "./pages/Add";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Edit from "./pages/Edit";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={List} />
        <Route path="/create" exact component={Add} />
        <Route path="/edit" component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
