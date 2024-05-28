import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
      isLoading: true,
      PageRefreshStatus: false,
    };
  }

  componentDidMount() {
    this.fetchCartData();
  }

  fetchCartData = () => {
    axios
      .get(AppURL.CartList(this.props.user.email))
      .then((response) => {
        console.log("Cart API Response:", response.data);
        this.setState({
          ProductData: response.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("Error fetching cart data:", error);
        this.setState({ isLoading: false });
      });
  };

  removeItem = (id) => {
    axios
      .get(AppURL.RemoveCartList(id))
      .then((response) => {
        if (response.data === 1) {
          cogoToast.success("Product Removed Successfully", {
            position: "top-right",
          });
          this.setState((prevState) => ({
            ProductData: prevState.ProductData.filter((item) => item.id !== id),
          }));
        } else {
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching cart data:", error);
        this.setState({ isLoading: false });
      });
  };

  ItemPlus = (id, quantity, price) => {
    axios
      .get(AppURL.CartItemPlus(id, quantity, price))
      .then((response) => {
        if (response.data === 1) {
          cogoToast.success("Product Updated Successfully", {
            position: "top-right",
          });
          this.fetchCartData();
        } else {
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching cart data:", error);
        this.setState({ isLoading: false });
      });
  };

  ItemMinus = (id, quantity, price) => {
    axios
      .get(AppURL.CartItemMinus(id, quantity, price))
      .then((response) => {
        if (response.data === 1) {
          cogoToast.success("Product Updated Successfully", {
            position: "top-right",
          });
          this.fetchCartData();
        } else {
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        console.log("Error fetching cart data:", error);
        this.setState({ isLoading: false });
      });
  };

  calculateSummary = () => {
    const { ProductData } = this.state;
    let subtotal = 0;
    const taxRate = 0.001;
    // let savings = 0;
    const shippingCost = 5.0;

    ProductData.forEach((item) => {
      const itemTotal = item.unit_price * item.quantity;
      subtotal += itemTotal;
      // savings += (item.unit_price - item.unit_price) * item.quantity;
    });

    const tax = subtotal * taxRate;
    const total = subtotal + shippingCost;

    return {
      subtotal,
      // savings,
      shippingCost,
      tax,
      total,
    };
  };

  render() {
    const { ProductData, isLoading } = this.state;
    const { subtotal, shippingCost, tax, total } = this.calculateSummary();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Container className="text-center" fluid={true}>
        <div className="section-title text-center mb-55 pt-5">
          <h2>Product Cart List</h2>
        </div>
        <div className="row p-3">
          {ProductData && ProductData.length > 0 ? (
            <Fragment>
              <div className="col-lg-8">
                <table className="table position-relative z-2 mb-4">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="fs-sm fw-normal nav justify-content-start py-3 ps-0"
                      >
                        <span className="text-body">Product</span>
                      </th>
                      <th
                        scope="col"
                        className="text-body fs-sm fw-normal py-3 d-none d-xl-table-cell"
                      >
                        <span className="text-body">Price</span>
                      </th>
                      <th
                        scope="col"
                        className="fs-sm fw-normal nav justify-content-center py-3 ps-0"
                      >
                        <span className="text-body">Quantity</span>
                      </th>
                      <th
                        scope="col"
                        className="text-body fs-sm fw-normal py-3 d-none d-md-table-cell"
                      >
                        <span className="text-body">Total</span>
                      </th>
                      <th scope="col" className="py-0 px-0">
                        <div className="nav justify-content-end">
                          <div
                            type="button"
                            className="d-inline-block text-nowrap py-3 px-0"
                          >
                            Clear cart
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    {ProductData.map((prodList, i) => {
                      return (
                        <tr key={i}>
                          <td className="py-3 ps-0">
                            <div className="d-flex align-items-center">
                              <a
                                className="flex-shrink-0"
                                href="shop-product-general-electronics.html"
                              >
                                <img
                                  src={prodList.image}
                                  alt={prodList.title}
                                  width="110"
                                />
                              </a>
                              <div className="w-100 min-w-0 ps-2 ps-xl-2">
                                <h5 className="d-flex animate-underline mb-2">
                                  <li className="d-block fs-sm fw-medium text-truncate animate-target">
                                    {prodList.product_name}
                                  </li>
                                </h5>
                                <ul className="list-unstyled gap-1 text-truncate fs-xs mb-0">
                                  <li>
                                    <span className="text-body-secondary">
                                      {prodList.color}
                                    </span>{" "}
                                    <span className="text-dark-emphasis fw-medium"></span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td>
                          <td className="h6 py-3 d-none d-xl-table-cell">
                            {prodList.unit_price} x {prodList.quantity}
                          </td>
                          <td className="py-3 d-none d-xl-table-cell">
                            <div className="nav justify-content-center d-flex align-items-center">
                              <Button
                                onClick={() =>
                                  this.ItemMinus(
                                    prodList.id,
                                    prodList.quantity,
                                    prodList.unit_price
                                  )
                                }
                                className="custombtn"
                              >
                                <i className="fa fa-minus"></i>
                              </Button>
                              <input
                                type="number"
                                className="form-control form-control-sm small-quantity-input"
                                value={prodList.quantity}
                                readOnly=""
                              />
                              <Button
                                onClick={() =>
                                  this.ItemPlus(
                                    prodList.id,
                                    prodList.quantity,
                                    prodList.unit_price
                                  )
                                }
                                className="custombtn"
                              >
                                <i className="fa fa-plus"></i>
                              </Button>
                            </div>
                          </td>
                          <td className="h6 py-3 d-none d-md-table-cell">
                            ${prodList.total_price}
                          </td>
                          <td className="text-end py-3 px-0">
                            <Button
                              onClick={() => this.removeItem(prodList.id)}
                              className="btn-close fs-sm custombtn"
                              data-bs-toggle="tooltip"
                              data-bs-custom-class="tooltip-sm"
                              data-bs-title="Remove"
                              aria-label="Remove from cart"
                            ></Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-lg-4">
                <div className="bg-body-tertiary rounded-5 p-4 mb-3">
                  <div className="p-sm-2 p-lg-0 p-xl-2">
                    <h5 className="border-bottom pb-4 mb-4">Order summary</h5>
                    <ul className="list-unstyled fs-sm gap-3 mb-0">
                      <li className="d-flex justify-content-between">
                        Subtotal ({ProductData.length} items):{" "}
                        <span className="text-dark-emphasis fw-medium">
                          ${subtotal.toFixed(2)}
                        </span>
                      </li>
                      <li className="d-flex justify-content-between">
                        Tax collected:{" "}
                        <span className="text-dark-emphasis fw-medium">
                          ${tax.toFixed(2)}
                        </span>
                      </li>
                      <li className="d-flex justify-content-between">
                        Shipping:{" "}
                        <span className="text-dark-emphasis fw-medium">
                          ${shippingCost.toFixed(2)}
                        </span>
                      </li>
                    </ul>
                    <div className="border-top pt-4 mt-4">
                      <div className="d-flex justify-content-between mb-3">
                        <span className="fs-sm">Estimated total:</span>
                        <span className="h5 mb-0">${total.toFixed(2)}</span>
                      </div>
                      <Link
                        className="btn btn-lg btn-primary w-100"
                        style={{ backgroundColor: "rgb(1, 125, 82)" }}
                        to={"/cartorder"}
                      >
                        Proceed to checkout
                        <i className="ci-chevron-right fs-lg ms-1 me-n1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <div>No products in the cart</div>
          )}
        </div>
      </Container>
    );
  }
}

export default Cart;
