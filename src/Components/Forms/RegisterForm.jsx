import React, { useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  BsFillLockFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsFillTelephoneFill,
  BsPersonCircle,
} from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaUpload } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import Logo from "../../Assets/logo-thin.png";

import "./Forms.css";

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(user: $input)
  }
`;

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, setCurrentUser, currentUser } = useContext(UserContext);
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    age: "",
    address: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string().required("Phone is required"),
    age: Yup.string().required("Age is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const { data } = await createUser({
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            avatar: values.avatar,
            address: values.address,
            phone: values.phone,
            age: values.age,
          },
        },
      });

      const userId = data.createUser;

      if (userId) {
        console.log("User created successfully!");

        // Perform any further actions after successful user creation
      } else {
        console.log("User creation failed");
      }
    } catch (err) {
      console.error("User creation error:", err);
    }

    const registeredUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      avatar: values.avatar,
      address: values.address,
      phone: values.phone,
      age: values.age,
    };

    register(registeredUser);
    setCurrentUser(values);
    navigate("/auth");
  };
  return (
    <div className="register-form">
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
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Field
                    className="form-input"
                    name="firstName"
                    type="text"
                    placeholder="Name"
                  />
                  <span className="form-icon">
                    <BsFillPersonFill />
                  </span>
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="form-error">{formik.errors.firstName}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                {" "}
                <div className="form-group">
                  <Field
                    className="form-input"
                    name="lastName"
                    type="text"
                    placeholder="Surname"
                  />
                  <span className="form-icon">
                    <BsFillPersonFill />
                  </span>
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="form-error">{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
            </div>
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
            <div className="row">
              <div className="col-md-6">
                {" "}
                <div className="form-group">
                  <Field
                    className="form-input"
                    name="avatar"
                    type="text"
                    placeholder="Avatar"
                  />
                  <span className="form-icon">
                    <FaUpload />
                  </span>
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="form-error">{formik.errors.lastName}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Field
                    className="form-input"
                    name="age"
                    type="text"
                    placeholder="Age"
                  />
                  <span className="form-icon">
                    <BsPersonCircle />
                  </span>
                  {formik.touched.age && formik.errors.age ? (
                    <div className="form-error">{formik.errors.age}</div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Field
                    className="form-input"
                    name="address"
                    type="text"
                    placeholder="Address"
                  />
                  <span className="form-icon">
                    <IoLocationSharp />
                  </span>
                  {formik.touched.address && formik.errors.address ? (
                    <div className="form-error">{formik.errors.address}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Field
                    className="form-input"
                    name="phone"
                    type="text"
                    placeholder="Phone"
                  />
                  <span className="form-icon">
                    <BsFillTelephoneFill />
                  </span>
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="form-error">{formik.errors.phone}</div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="form-group">
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
            <div className="form-group">
              <Field
                className="form-input"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
              />
              <span className="form-icon">
                <BsFillLockFill />
              </span>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="form-error">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="form-button">
              <button className="btn" type="submit">
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
