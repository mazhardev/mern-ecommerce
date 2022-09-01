import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

import { createStructuredSelector } from "reselect";

import CartIcon from "../cart/CartIcon";
import CartDropdown from "../cart/CartDropdown";
import { selectCartHidden } from "../../selectors/cart";
import { selectAuthItem } from "../../selectors/auth";

const Navbar = ({ auth: { isAuthenticated, user }, logout, hidden }) => {
  const authLinks = user && (
    <div className="ml-4 dropdown d-line">
      <div
        className="btn dropdown-toggle mr-4"
        id="dropDownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <figure className="avatar avatar-nav">
          <img
            src={user.avatar || "/images/default_avatar.jpg"}
            alt={user && user.email}
            className="rounded-circle"
          />
        </figure>
        <span>{user && user.email}</span>
        <span>({user && user.balance}$)</span>
      </div>

      <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
        {user.role === "admin" && (
          <Link to="/users" className="dropdown-item">
            Users
          </Link>
        )}

        <Link to="/ads/create" className="dropdown-item">
          Create Ad
        </Link>

        <Link to="/" className="dropdown-item">
          All Ads
        </Link>
        <Link to="/" className="dropdown-item text-danger" onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  );

  const guestLinks = (
    <Link
      to="/login"
      className="btn btn-danger px-4 text-white login-header-btn float-right"
    >
      Login
    </Link>
  );
  const item = {
    id: "fdsfsdfsd",
    name: "test",
    price: "12",
    imageUrl: "https://i.ibb.co/RjBLWxB/grey-brim.png",
  };
  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link to="/">
              <img
                style={{ cursor: "pointer" }}
                src="/images/buy_sale_car_parts_logo.png"
                alt="BUYSALCARPARTS"
              />
            </Link>
          </div>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          <div className="container-cart-ddl">
            <CartIcon />
            {hidden ? null : <CartDropdown />}
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
  auth: selectAuthItem,
});

export default connect(mapStateToProps, { logout })(Navbar);
