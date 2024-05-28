import React, { Component, Fragment } from "react";
import axios from "axios";
import AppURL from "../api/AppURL";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import CartOrder from "../components/cart/CartOrder";

class CartOrderPage extends Component {
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

    return (
      <Fragment>
        <NavMenuDesktop />
        {cartData && <CartOrder data={cartData} user={this.props.user} />}
        <div className="Desktop">{/* <Footer /> */}</div>
      </Fragment>
    );
  }
}

export default CartOrderPage;
