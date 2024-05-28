import React, { Component, Fragment } from "react";
import OrderList from "../components/cart/OrderList";
import Footer from "../components/common/Footer";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import axios from "axios";
import AppURL from "../api/AppURL";

export class OrderListPage extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  fetchCartData = async () => {
    try {
      const response = await axios.get(AppURL.CartList((this.props.user.email)));
      this.setState({ cartData: response.data });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  render() {

    const { user } = this.props.user;

    return (
      <Fragment>
        <div className="Desktop">
          <NavMenuDesktop />
        </div>

        <OrderList user={user} />

       
      </Fragment>
    );
  }
}
export default OrderListPage;
