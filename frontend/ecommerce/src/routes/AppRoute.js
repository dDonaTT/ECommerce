import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

class AppRoute extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Fragment>
      </Router>
    );
  }
}

export default AppRoute;
