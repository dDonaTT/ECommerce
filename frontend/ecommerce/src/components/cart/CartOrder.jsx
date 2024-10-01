import axios from "axios";
import cogoToast from "cogo-toast";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate } from "react-router";

const stripePromise = loadStripe(
  "pk_test_51Q52gcCKzKHKlfT1rHUbtk92Mxnqwra0ALzTkS7xADJoxncWvnbupTfvNQdUZK66RRI5LpFhTXMPRLdkF63IETwg00UyADSyrD"
);

class CartOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showShippingAddress: false,
      showPaymentMethod: false,
      city: "",
      payment: "",
      delivery: "",
      name: "",
      address: "",
      lastname: "",
      zip: "",
      mobile: "",
      email: props.user ? props.user.email : "",
      confirmBtn: "Confirm Order",
      redirectToOrderList: false,
    };
  }

  handleContinueClick = () => {
    this.setState({ showShippingAddress: true });
    this.setState({ showPaymentMethod: true });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  saveOrder = async (formData) => {
    try {
      const orderResponse = await axios.post(AppURL.CartOrder, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return orderResponse.data;
    } catch (error) {
      console.error('Error saving order:', error.response ? error.response.data : error);
      return null; 
    }
  };

  confirmOnClick = async () => {
    const { city, payment, delivery, name, address, email } = this.state;

    if (!city || !payment || !name || !address) {
      cogoToast.error("Please fill out all required fields", {
        position: "top-right",
      });
      return;
    }

    const invoice = new Date().getTime();
    const formData = new FormData();

  
    formData.append("city", city);
    formData.append("payment_method", payment);
    formData.append("delivery_method", delivery);
    formData.append("name", name);
    formData.append("delivery_address", address);
    formData.append("email", email);
    formData.append("invoice_no", invoice);
    formData.append("delivery_charge", "00");

    try {
      if (payment === "Card") {
       
        const stripe = await stripePromise;

        const response = await axios.post(AppURL.CreateCheckoutSession, {
          amount: 400, 
        });

        const sessionId = response.data.id;

        const result = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (result.error) {
          cogoToast.error("Stripe Checkout failed", {
            position: "top-right",
          });
        } else {
          const orderResponse = await this.saveOrder(formData);
          if (orderResponse && orderResponse.status === 1) {
            cogoToast.success("Order placed successfully", {
              position: "top-right",
            });
            this.setState({ redirectToOrderList: true });
          } else {
            cogoToast.error("Order placement failed. Try again", {
              position: "top-right",
            });
          }
        }
      } else {
        
        const orderResponse = await this.saveOrder(formData);
        if (orderResponse && orderResponse.status === 1) {
          cogoToast.success("Order placed successfully", {
            position: "top-right",
          });
          this.setState({ redirectToOrderList: true });
        } else {
          cogoToast.error("Order placement failed. Try again", {
            position: "top-right",
          });
        }
      }
    } catch (error) {
      cogoToast.error("Error placing order", {
        position: "top-right",
      });
      console.error('Error placing order:', error.response ? error.response.data : error);
    }
  };
  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (this.state.redirectToOrderList) {
      return <Navigate to="/orderlist" />;
    }
    return (
      <div className="container py-7">
        <div className="row pt-1 pt-sm-3 pt-lg-4 pb-2 pb-md-3 pb-lg-4 pb-xl-5 d-flex align-items-center justify-content-center">
          <div className="col-lg-8 col-xl-7 mb-5 mb-lg-0">
            <div className="d-flex flex-column gap-5 pe-lg-4 pe-xl-0">
              <div className="d-flex align-items-start">
                <div className="w-100 ps-3 ps-md-4">
                  <div className="ms-n5 ms-sm-0">
                    <div className="d-flex align-items-start">
                      <div
                        className="d-flex align-items-center justify-content-center text-white rounded-circle fs-sm fw-semibold lh-1 flex-shrink-0"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          marginTop: "-.125rem",
                          backgroundColor: "rgb(1, 125, 82)",
                        }}
                      >
                        1
                      </div>
                      <div
                        className="flex-grow-0 flex-shrink-0 ps-3 ps-md-4"
                        style={{ width: "calc(100% - 2rem)" }}
                      >
                        <h1 className="h5 mb-md-4">Delivery information</h1>
                        <div className="ms-n5 ms-sm-0">
                          <h3 className="h6 border-bottom pb-4 mb-0">
                            Choose shipping method
                          </h3>
                          <div
                            className="mb-lg-4"
                            id="shippingMethod"
                            role="list"
                          >
                            <div className="border-bottom">
                              <div
                                className="form-check mb-0 collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#courier"
                                aria-expanded="false"
                                aria-controls="courier"
                              >
                                <label className="form-check-label d-flex align-items-center text-dark-emphasis fw-semibold py-4">
                                  <input
                                    type="radio"
                                    className="form-check-input fs-base me-2 me-sm-3"
                                    name="delivery"
                                    value="Courier"
                                    onChange={this.handleChange}
                                  />
                                  Courier delivery
                                </label>
                              </div>
                            </div>
                            <div className="border-bottom">
                              <div
                                className="form-check mb-0 collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#pickup"
                                aria-expanded="false"
                                aria-controls="pickup"
                              >
                                <label className="form-check-label d-flex align-items-center text-dark-emphasis fw-semibold py-4">
                                  <input
                                    type="radio"
                                    className="form-check-input fs-base me-2 me-sm-3"
                                    name="delivery"
                                    value="Pickup"
                                    onChange={this.handleChange}
                                  />
                                  Pickup from store
                                  <span className="fw-normal ms-auto">
                                    Free
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div className="border-bottom">
                              <div
                                className="form-check mb-0 collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#shipping"
                                aria-expanded="false"
                                aria-controls="shipping"
                              >
                                <label className="form-check-label d-flex align-items-center text-dark-emphasis fw-semibold py-4">
                                  <input
                                    type="radio"
                                    className="form-check-input fs-base me-2 me-sm-3"
                                    name="delivery"
                                    value="Local Shipping"
                                    onChange={this.handleChange}
                                  />
                                  Local shipping
                                </label>
                              </div>
                            </div>
                          </div>
                          <Button
                            className="btn btn-lg btn-primary w-100"
                            onClick={this.handleContinueClick}
                            style={{
                              backgroundColor: "rgb(1, 125, 82)",
                            }}
                          >
                            Continue
                            <i className="ci-chevron-right fs-lg ms-1 me-n1"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <div
                  className="d-flex align-items-center justify-content-center text-white rounded-circle fs-sm fw-semibold lh-1 flex-shrink-0"
                  style={{
                    width: "2rem",
                    height: "2rem",
                    marginTop: "-.125rem",
                    backgroundColor: "rgb(1, 125, 82)",
                  }}
                >
                  2
                </div>
                <div className="w-100 ps-3 ps-md-4">
                  <h1 className="h5 mb-md-4">Shipping address</h1>
                  {this.state.showShippingAddress && (
                    <form className="needs-validation" novalidate="">
                      <div className="row row-cols-1 row-cols-sm-2 g-3 g-sm-4 mb-4">
                        <div className="col">
                          <label htmlFor="shipping-fn" className="form-label">
                            First name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="shipping-fn"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            required=""
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="shipping-ln" className="form-label">
                            Last name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="shipping-ln"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            required=""
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor="shipping-email"
                            className="form-label"
                          >
                            Email address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            id="shipping-email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required=""
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor="shipping-mobile"
                            className="form-label"
                          >
                            Mobile number
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="shipping-mobile"
                            name="mobile"
                            value={this.state.mobile}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="col">
                          <label
                            htmlFor="shipping-address-1"
                            className="form-label"
                          >
                            Address Line 1{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="shipping-address-1"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                            required=""
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="shipping-zip" className="form-label">
                            Zip code <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="shipping-zip"
                            name="zip"
                            value={this.state.zip}
                            onChange={this.handleChange}
                            required=""
                          />
                        </div>
                        <div className="col">
                          <label className="form-label">
                            City <span className="text-danger">*</span>
                          </label>
                          <div className="choices">
                            <select
                              className="form-select form-select-lg"
                              name="city"
                              value={this.state.city}
                              onChange={this.handleChange}
                              required=""
                            >
                              <option value="" disabled>
                                Select your city
                              </option>
                              <option value="Prishtine">Prishtine</option>
                              <option value="Gjakove">Gjakove</option>
                              <option value="Peje">Peje</option>
                              <option value="Prizren">Prizren</option>
                              <option value="Ferizaj">Ferizaj</option>
                              <option value="Gjilan">Gjilan</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                  {this.state.showPaymentMethod && (
                    <div>
                      <h1 className="h5 mb-md-4">Payment method</h1>
                      <div className="border-bottom">
                        <div className="form-check mb-0">
                          <label className="form-check-label d-flex align-items-center text-dark-emphasis fw-semibold py-4">
                            <input
                              type="radio"
                              className="form-check-input fs-base me-2 me-sm-3"
                              name="payment"
                              value="Cash"
                              onChange={this.handleChange}
                              checked={this.state.payment === "Cash"}
                            />
                            Cash on Delivery
                          </label>
                        </div>
                      </div>
                      <div className="border-bottom">
                        <div className="form-check mb-0">
                          <label className="form-check-label d-flex align-items-center text-dark-emphasis fw-semibold py-4">
                            <input
                              type="radio"
                              className="form-check-input fs-base me-2 me-sm-3"
                              name="payment"
                              value="Card"
                              onChange={this.handleChange}
                              checked={this.state.payment === "Card"}
                            />
                            Credit/Debit Card
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-none d-lg-flex">
                <Button
                  className="btn btn-lg btn-primary w-100"
                  onClick={this.confirmOnClick}
                  style={{
                    backgroundColor: "rgb(1, 125, 82)",
                  }}
                >
                  Continue to payment
                  <i className="ci-chevron-right fs-lg ms-1 me-n1"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartOrder;
