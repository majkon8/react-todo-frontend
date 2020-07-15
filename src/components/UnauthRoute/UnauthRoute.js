import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UnauthRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

UnauthRoute.propTypes = { isAuthenticated: PropTypes.bool.isRequired };

export default connect(mapStateToProps)(UnauthRoute);
