import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  BsFillLockFill,
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsFillTelephoneFill,
  BsPersonCircle,
} from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaUpload } from "react-icons/fa";
import * as Yup from "yup";
import "./Forms.css";

const EditForm = ({ user, onSubmit }) => {
  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    phone: user.phone,
    age: user.age,
    avatar: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone number is required"),
    age: Yup.string().required("Age is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div className="edit-form-wrapper">
      <h2>Edit Profile</h2>
      <div className="edit-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="edit-form-group">
                <label htmlFor="email">Email -You can't edit this field</label>

                <Field
                  disabled
                  name="email"
                  type="email"
                  className="edit-form-input"
                />

                <span className="edit-form-icon">
                  <BsFillEnvelopeFill />
                </span>
                <p className="edit-form-error">
                  <ErrorMessage name="email" />
                </p>
              </div>
              <div className="edit-form-two-columns">
                <div className="edit-form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    className="edit-form-input"
                  />
                  <span className="edit-form-icon">
                    <BsFillPersonFill />
                  </span>
                  <p className="edit-form-error">
                    <ErrorMessage name="firstName" />
                  </p>
                </div>
                <div className="edit-form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    name="lastName"
                    type="text"
                    className="edit-form-input"
                  />
                  <span className="edit-form-icon">
                    <BsFillPersonFill />
                  </span>
                  <p className="edit-form-error">
                    <ErrorMessage name="lastName" />
                  </p>
                </div>
              </div>
              <div className="edit-form-two-columns">
                <div className="edit-form-group">
                  <label htmlFor="address">Address</label>
                  <Field
                    name="address"
                    type="text"
                    className="edit-form-input"
                  />
                  <span className="edit-form-icon">
                    <IoLocationSharp />
                  </span>
                  <p className="edit-form-error">
                    <ErrorMessage name="address" className="edit-form-error" />
                  </p>
                </div>
                <div className="edit-form-group">
                  <label htmlFor="avatar">Avatar</label>
                  <Field
                    className="edit-form-input"
                    name="avatar"
                    type="text"
                  />
                  <span className="edit-form-icon">
                    <FaUpload />
                  </span>
                  <p className="edit-form-error">
                    <ErrorMessage name="avatar" className="edit-form-error" />
                  </p>
                </div>
              </div>
              <div className="edit-form-two-columns">
                <div className="edit-form-group">
                  <label htmlFor="phone">Phone</label>
                  <Field name="phone" type="text" className="edit-form-input" />
                  <span className="edit-form-icon">
                    <BsFillTelephoneFill />
                  </span>
                  <p className="edit-form-error">
                    <ErrorMessage name="phone" />
                  </p>
                </div>
                <div className="edit-form-group">
                  <label htmlFor="age">Age</label>
                  <Field name="age" type="text" className="edit-form-input" />
                  <span className="edit-form-icon">
                    <BsPersonCircle />
                  </span>
                  <p className="edit-form-error">
                    <ErrorMessage name="age" />
                  </p>
                </div>
              </div>
              <div className="edit-form-two-columns">
                <div className="edit-form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="edit-form-input"
                  />
                  <span className="edit-form-icon">
                    <BsFillLockFill />
                  </span>
                  <p className="edit-form-error">
                    <ErrorMessage name="password" />
                  </p>
                </div>
                <div className="edit-form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="edit-form-input"
                  />
                  <span className="edit-form-icon">
                    <BsFillLockFill />
                  </span>
                  <p className="edit-form-error">
                    <ErrorMessage name="confirmPassword" />
                  </p>
                </div>
              </div>

              <span className="form-icon">{/* <FaUpload /> */}</span>
              <div className="edit-button">
                <button className="btn btn-primary" type="submit">
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditForm;
