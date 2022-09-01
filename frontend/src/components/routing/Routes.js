import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";
import AllAds from "../ads/AllAds";
import CreateAd from "../ads/CreateAd";
import AllUsers from "../user/AllUsers";
import AdDetails from "../ads/AdDetails";
import LoginAdmin from "../auth/LoginAdmin";
import CheckoutPage from "../checkout/CheckoutPage";
import EditAd from "../ads/EditAd";
import Search from "../ads/Search";

const Routes = (props) => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={AllAds} />
        <Route exact path="/post/:id" component={AdDetails} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login-admin" component={LoginAdmin} />
        <PrivateRoute exact path="/ads/create" component={CreateAd} />
        <PrivateRoute exact path="/users" component={AllUsers} />
        <PrivateRoute exact path="/checkout" component={CheckoutPage} />
        <PrivateRoute exact path="/post/edit/:id" component={EditAd} />
        <Route exact path="/search" component={Search} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
