import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppURL from "../api/AppURL";
import axios from "axios";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import HomePage from "../pages/HomePage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ProfilePage from "../pages/ProfilePage";
import UserLoginPage from "../pages/UserLoginPage";
import ContactPage from "../pages/ContactPage";
import PrivacyPage from "../pages/PrivacyPage";
import PurchasePage from "../pages/PurchasePage";
import RefundPage from "../pages/RefundPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import NotificationPage from "../pages/NotificationPage";
import FavouritePage from "../pages/FavoritePage";
import CartPage from "../pages/CartPage";
import RegisterPage from "../pages/RegisterPage";
import OrderListPage from "../pages/OrderListPage";

class AppRoute extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.UserData)
      .then((response) => {
        this.setUser(response.data);
      })
      .catch((error) => {});
  }

  setUser = (user) => {
    this.setState({ user: user });
  };

  render() {
    return (
      <Router>
        <Fragment>
          <NavMenuDesktop user={this.state.user} setUser={this.setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <UserLoginPage user={this.state.user} setUser={this.setUser} />
              }
            />
            <Route
              path="/register"
              element={
                <RegisterPage user={this.state.user} setUser={this.setUser} />
              }
            />
            <Route path="/forget" element={<ForgetPasswordPage />} />
            <Route path="/reset/:id" element={<ResetPasswordPage />} />
            <Route
              path="/profile"
              element={
                <ProfilePage user={this.state.user} setUser={this.setUser} />
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route
              path="/productdetails/:code"
              element={<ProductDetailsPage user={this.state.user} />}
            />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/favorite" element={<FavouritePage />} />
            <Route
              path="/orderlist"
              element={<OrderListPage user={this.state.user} />}
            />
            <Route path="/cart" element={<CartPage user={this.state.user}/> } />
          </Routes>
        </Fragment>
      </Router>
    );
  }
}

export default AppRoute;
