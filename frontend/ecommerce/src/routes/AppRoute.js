import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserLoginPage from "../pages/UserLoginPage";
import ContactPage from "../pages/ContactPage";
import PrivacyPage from '../pages/PrivacyPage';
import PurchasePage from '../pages/PurchasePage';
import RefundPage from '../pages/RefundPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import NotificationPage from "../pages/NotificationPage";
import FavouritePage from "../pages/FavoritePage";

class AppRoute extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<UserLoginPage />} />
            <Route path="contact" element={<ContactPage />} />

            <Route  path="/purchase" element={<PurchasePage/>} />
               <Route  path="/privacy" element={<PrivacyPage/>} />
               <Route  path="/refund" element={<RefundPage/>} />
               <Route  path="/productdetails" element={<ProductDetailsPage/>} />
               <Route  path="/notification" element={<NotificationPage/>} />
               <Route  path="/favorite" element={<FavouritePage/>} />
          </Routes>
        </Fragment>
      </Router>
    );
  }
}

export default AppRoute;
