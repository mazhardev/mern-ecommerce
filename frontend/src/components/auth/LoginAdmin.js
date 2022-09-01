import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginAdmin } from "../../actions/auth";
import ButtonLoader from "../layout/ButtonLoader";
const Login = ({ loginAdmin, auth: { isAuthenticated }, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    loginAdmin(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={onSubmit}>
            <h1 className="mb-3">Admin Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                placeholder="Email Address"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="password_field"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
              />
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              {loading ? <ButtonLoader /> : "LOGIN"}
            </button>

           
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

export default connect(mapStateToProps, { loginAdmin })(Login);
