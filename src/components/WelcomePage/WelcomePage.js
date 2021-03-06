import React from "react";
import "./WelcomePage.scss";
import todoImage from "../../assets/todoImage.jpg";
import Form from "../Form/Form";

export default function Login() {
  return (
    <div className="flex-container">
      <div className="page-container">
        <div className="welcome-image-container">
          <img className="todo-image" src={todoImage} alt="todo" />
        </div>
        <div className="form-container">
          <Form />
        </div>
      </div>
    </div>
  );
}
