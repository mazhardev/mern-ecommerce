import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../cart/CheckoutItem";

import { selectCartItems, selectCartTotal } from "../../selectors/cart";
import { selectLoading } from "../../selectors/loading";
import ButtonLoader from "../layout/ButtonLoader";
import { checkOut } from "../../actions/auth";

const CheckoutPage = ({ cartItems, total, loading, checkOut }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Part</span>
      </div>
      <div className="header-block">
        <span>Name</span>
      </div>

      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">TOTAL: ${total}</div>
    <button
      id="login_button"
      type="button"
      className="btn btn-block py-3  btn-primary"
      disabled={loading ? true : false}
      onClick={() => checkOut(total, cartItems)}
    >
      {loading ? <ButtonLoader /> : `Buy Now $${total}`}
    </button>
    <div className="test-warning">*Fake balance*</div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  loading: selectLoading,
});

export default connect(mapStateToProps, { checkOut })(CheckoutPage);
