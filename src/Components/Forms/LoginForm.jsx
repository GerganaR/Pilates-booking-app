import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { BsFillLockFill, BsFillEnvelopeFill } from "react-icons/bs";
import { UserContext } from "../../Context/UserContext";
import Logo from "../../Assets/logo-thin.png";
import { useMutation, gql, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import "./Forms.css";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const LoginForm = () => {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const initialValues = {
    password: "",
    email: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Password is inavlid"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      console.log("Token:", token);
      console.log("LOGIN");

      console.log(currentUser);
      setCurrentUser(token);
    } else {
      console.log("Token not found");
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      const token = data.login;

      if (token) {
        const cookieOptions = {
          secure: true,
          expires: 1,
        };

        Cookies.set("token", token, cookieOptions);

        navigate("/pilates");
        console.log("Login successful!");

        console.log(data.login);
      } else {
        console.log("Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-form">
      <img src={Logo} />
      <h1 className="login-heading">Welcome to Sport!</h1>
      <p className="login-text">
        Hello again. Log in your profile to check the progress.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <div className="form-group">
              <Field
                className="form-input"
                name="email"
                type="email"
                placeholder="Email"
              />
              <span className="form-icon">
                <BsFillEnvelopeFill />
              </span>
              {formik.touched.email && formik.errors.email ? (
                <div className="form-error">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-group">
              {/* <label className="form-label" htmlFor="password">
                Password
              </label> */}
              <Field
                className="form-input"
                name="password"
                type="password"
                placeholder="Password"
              />
              <span className="form-icon">
                <BsFillLockFill />
              </span>
              {formik.touched.password && formik.errors.password ? (
                <div className="form-error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="form-button">
              <button className="btn" type="submit">
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
