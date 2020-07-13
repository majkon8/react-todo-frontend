import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage/WelcomePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={WelcomePage} />
      </Switch>
    </Router>
  );
}

export default App;
