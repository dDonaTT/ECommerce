import React, { Component, Fragment } from "react";

import Notification from "../components/Notification/Notification";
import Footer from "../components/common/Footer";
import NavMenuDesktop from "../components/common/NavMenuDesktop";

class NotificationPage extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <Fragment>
        <NavMenuDesktop />

        <Notification />

        <div className="Desktop">
          <Footer />
        </div>
      </Fragment>
    );
  }
}

export default NotificationPage;
