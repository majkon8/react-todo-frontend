import React, { useState, useEffect } from "react";
import "./Form.scss";
import { validateUserData } from "./validateUserData";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { signup, login } from "../../redux/actions/userActions";

function Form({ signup, login, UI }) {
  // display confirmPassword input when set to false
  const [isLoginFormSelected, setIsLoginFormSelected] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setError(UI.error);
    setSuccess(UI.success);
  }, [UI]);

  const switchFormToLogin = () => {
    setIsLoginFormSelected(true);
    setConfirmPassword("");
  };

  const switchFormToSignup = () => setIsLoginFormSelected(false);

  const handleChange = (event, setState) => setState(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = isLoginFormSelected
      ? { email, password }
      : { email, password, confirmPassword };
    const errors = validateUserData(userData);
    // set only first error
    setError(errors[0]);
    if (errors.length > 0) return;
    if (isLoginFormSelected) return login(userData);
    else return signup(userData);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-switch-container">
        <div className="form-switch">
          <div className="form-switch-options">
            <div onClick={switchFormToLogin} className="form-switch-login">
              Log in
            </div>
            <div onClick={switchFormToSignup} className="form-switch-signup">
              Sign up
            </div>
          </div>
          <hr
            className={
              "underline" +
              (isLoginFormSelected ? " underline-signin" : " underline-signup")
            }
          />
        </div>
      </div>

      <label className="label" htmlFor="email">
        Email:
      </label>
      <input
        onChange={(e) => handleChange(e, setEmail)}
        value={email}
        className="input"
        type="email"
        name="email"
        id="email"
        placeholder="Type your email..."
        required
      />

      <label className="label" htmlFor="password">
        Password:
      </label>
      <input
        onChange={(e) => handleChange(e, setPassword)}
        value={password}
        className="input"
        type="password"
        name="password"
        id="password"
        placeholder="Type your password..."
        required
      />

      {!isLoginFormSelected && (
        <>
          <label className="label" htmlFor="password">
            Confirm password:
          </label>
          <input
            onChange={(e) => handleChange(e, setConfirmPassword)}
            value={confirmPassword}
            className="input"
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm your password..."
            required
          />
        </>
      )}

      <button
        className="submit-button"
        type="submit"
        disabled={
          isLoginFormSelected
            ? !email || !password
            : !email || !password || !confirmPassword
        }
      >
        {UI.loading ? (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          "Send"
        )}
      </button>
      {error && <div className="message error-message">{error}</div>}
      {success && <div className="message success-message">{success}</div>}
    </form>
  );
}

Form.propTypes = {
  signup: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ UI: state.UI });
const mapActionsToProps = { signup, login };

export default connect(mapStateToProps, mapActionsToProps)(Form);
