import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Components
import WelcomePage from "./components/WelcomePage/WelcomePage";
import MainPage from "./components/MainPage/MainPage";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/welcome" component={WelcomePage} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
