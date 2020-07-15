import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import axios from "axios";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
// Components
import WelcomePage from "./components/WelcomePage/WelcomePage";
import MainPage from "./components/MainPage/MainPage";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import UnauthRoute from "./components/UnauthRoute/UnauthRoute";
// Redux
import { SET_AUTHENTICATED } from "./redux/types";

const refreshToken = localStorage.refreshToken;
if (refreshToken) {
  store.dispatch({ type: SET_AUTHENTICATED, payload: true });
  axios.defaults.headers.common["Refresh"] = refreshToken;
}

axios.interceptors.response.use(null, async (error) => {
  if (error.config && error.response && error.response.status === 401) {
    const response = await axios.get("/api/users/token");
    const accessToken = response.data.data;
    const authHeader = `Bearer ${accessToken}`;
    error.config.headers.Authorization = authHeader;
    axios.defaults.headers.common["Authorization"] = authHeader;
    return axios.request(error.config);
  }
});

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <UnauthRoute exact path="/" component={MainPage} />
          <AuthRoute path="/welcome" component={WelcomePage} />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
