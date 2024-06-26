import React, { Component, Fragment } from "react";
import Cart from "../components/cart/Cart";
import Footer from "../components/common/Footer";
import axios from "axios";
import AppURL from "../api/AppURL";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import OrderList from "../components/cart/OrderList";
import CartOrder from "../components/cart/CartOrder";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartData: null,
    };
  }

  componentDidMount() {
    this.fetchCartData();
    window.scrollTo(0, 0);
  }

  fetchCartData = async () => {
    try {
      const response = await axios.get(AppURL.CartList(this.props.user.email));
      this.setState({ cartData: response.data });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { cartData } = this.state;
    const { user } = this.props;

    return (
      <Fragment>
        <NavMenuDesktop />
        {cartData && <Cart data={cartData} user={user} />}
        <div className="Desktop">{/* <Footer /> */}</div>

        {/* <OrderList/> */}
      </Fragment>
    );
  }
}

export default CartPage;
