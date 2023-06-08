import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthPage.css";
import Cookies from "js-cookie";
import LoginForm from "../../Components/Forms/LoginForm";
import RegisterForm from "../../Components/Forms/RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  // const token = Cookies.get("token");
  const toggleFormType = () => {
    setIsLogin(!isLogin);
  };
  // console.log("authpage");
  // console.log(token);
  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className="auth-switch-text">
          <div class="line-with-text">
            <span class="line"></span>
            <span class="text">or</span>
            <span class="line"></span>
          </div>
          {isLogin ? "Don't have an account? " : "Already have an account? "}

          <Link
            style={{ textDecoration: "none", color: "#000" }}
            onClick={toggleFormType}
          >
            {isLogin ? "Register" : "Log in"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
