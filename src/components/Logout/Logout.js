import React from "react";
import "./Logout.scss";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/userActions";

function Logout({ logout }) {
  const handleLogout = () => logout();

  return (
    <i
      onClick={handleLogout}
      title="Log out"
      className="logout-icon fa fa-sign-out"
      aria-hidden="true"
    ></i>
  );
}

Logout.propTypes = { logout: PropTypes.func.isRequired };

const mapActionsToProps = { logout };

export default connect(null, mapActionsToProps)(Logout);
