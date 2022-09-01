import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";
import { LOGOUT } from "./actions/types";

// Redux
import { Provider } from "react-redux";
import {store} from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import AllAds from "./components/ads/AllAds";
import Footer from "./components/layout/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={AllAds} />
            <Route component={Routes} />
          </Switch>
          <ToastContainer position="bottom-right" />
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
