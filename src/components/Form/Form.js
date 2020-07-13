import React, { useState } from "react";
import "./Form.scss";

export default function Form() {
  // display confirmPassword input when set to false
  const [isLoginFormSelected, setIsLoginFormSelected] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const switchFormToLogin = () => {
    setIsLoginFormSelected(true);
    setConfirmPassword("");
  };

  const switchFormToSignup = () => setIsLoginFormSelected(false);

  const handleChange = (event, setState) => setState(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password, confirmPassword);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-switch-container">
        <div className="form-switch">
          <div className="form-switch-options">
            <div onClick={switchFormToLogin} className="form-switch-signin">
              Sign in
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
            className={"input"}
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="Confirm your password..."
            required
          />
        </>
      )}

      <button
        className="button"
        type="sumit"
        disabled={
          isLoginFormSelected
            ? !email || !password
            : !email || !password || !confirmPassword
        }
      >
        Send
      </button>

      {/* <div className="message success-message">You can now log in</div>
      <div className="message error-message">Wrong password</div> */}
    </form>
  );
}
