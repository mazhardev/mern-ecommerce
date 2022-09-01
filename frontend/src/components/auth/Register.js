import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../actions/auth";
import ButtonLoader from "../layout/ButtonLoader";

const Register = ({ register, auth: { isAuthenticated }, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={onSubmit}>
            <h1 className="mb-3">Join Us</h1>

            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                id="password_field2"
                className="form-control"
                name="password2"
                value={password2}
                onChange={onChange}
              />
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {loading ? <ButtonLoader /> : "REGISTER"}
            </button>
            <p className="float-right mt-3">
              <Link to="/login">Sign In?</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.async.loading,
});

export default connect(mapStateToProps, { register })(Register);
