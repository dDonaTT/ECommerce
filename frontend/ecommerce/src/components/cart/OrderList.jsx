import React, { Component } from "react";
import { Fragment } from "react";
import AppURL from "../../api/AppURL";
import axios from "axios";
import { Container, Button, Card, Modal, Col } from "react-bootstrap";
import cogoToast from "cogo-toast";
import { Link } from "react-router-dom";

export class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
      show: false,
      name: "",
      rating: "",
      comment: "",
      product_name: "",
      product_code: "",
      ReviewModal: false,
    };
  }

  componentDidMount() {
    this.fetchOrderData();
  }

  fetchOrderData = async () => {
    let email = localStorage.getItem("user_email");
    try {
      const response = await axios.get(AppURL.OrderListByUser(email));
      const productData = response.data;

      this.setState({ ProductData: productData });
    } catch (error) {
      console.log("Error fetching order data:", error);
    }
  };

  ReviewModalOpen = (product_code, product_name) => {
    this.setState({
      ReviewModal: true,
      product_code: product_code,
      product_name: product_name,
    });
  };

  ReviewModalClose = () => {
    this.setState({ ReviewModal: false });
  };

  nameOnChange = (event) => {
    let name = event.target.value;
    this.setState({ name: name });
  };

  RatingOnChange = (event) => {
    let rating = event.target.value;
    this.setState({ rating: rating });
  };

  CommentOnChanage = (event) => {
    let comment = event.target.value;
    this.setState({ comment: comment });
  };

  PostReview = () => {
    let product_code = this.state.product_code;
    let product_name = this.state.product_name;
    let rating = this.state.rating;
    let comment = this.state.comment;
    let name = this.state.name;

    if (name.length === 0) {
      cogoToast.error("Name Is Required", { position: "top-right" });
    } else if (comment.length === 0) {
      cogoToast.error("Comment Is Required", { position: "top-right" });
    } else if (rating.length === 0) {
      cogoToast.error("Rating Is Required", { position: "top-right" });
    } else if (comment.length > 50) {
      cogoToast.error("Comments can't be more than 50 characters", {
        position: "top-right",
      });
    } else {
      let MyFormData = new FormData();
      MyFormData.append("product_code", product_code);
      MyFormData.append("product_name", product_name);
      MyFormData.append("reviewer_name", name);
      MyFormData.append("reviewer_photo", "");
      MyFormData.append("reviewer_rating", rating);
      MyFormData.append("reviewer_comments", comment);

      console.log(Object.fromEntries(MyFormData));

      axios
        .post(AppURL.PostReview, MyFormData)
        .then((response) => {
          if (response.data.success) {
            cogoToast.success("Review Submitted", { position: "top-right" });
            this.ReviewModalClose();
          } else {
            cogoToast.error("Your Request is not done! Try Again", {
              position: "top-right",
            });
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
        });
    }
  };

  render() {
    let email = localStorage.getItem("user_email");
    const MyList = this.state.ProductData;

    if(email === null){
      return (
        <Col
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Link to={"/login"}> Login First
          </Link>
         
        </Col>
      );
    }

    const MyView = (
      <div className="col-lg-3">
        <div className="ps-lg-3 ps-xl-0">
          <h1 className="h2 me-3 mb-0">Orders</h1>
          <div data-filter-list='{"listClass": "orders-list", "sortClass": "orders-sort", "valueNames": ["date", "total"]}'>
            <table className="table table-bordered align-middle fs-sm text-nowrap text-center">
              <thead>
                <tr>
                  <th scope="col" className="py-3 ps-0">
                    <span className="text-body fw-normal">Order #</span>
                  </th>
                  <th scope="col" className="py-3 ps-0">
                    <span className="text-body fw-normal">Product Name #</span>
                  </th>
                  <th scope="col" className="py-3 d-none d-md-table-cell">
                    <span className="text-body fw-normal">Order date</span>
                  </th>
                  <th scope="col" className="py-3 d-none d-md-table-cell">
                    <span className="text-body fw-normal">Status</span>
                  </th>
                  <th scope="col" className="py-3 d-none d-md-table-cell">
                    <span className="text-body fw-normal">Payment Method</span>
                  </th>
                  <th scope="col" className="py-3 d-none d-md-table-cell">
                    <span className="text-body fw-normal">Delivery Method</span>
                  </th>
                  <th scope="col" className="py-3 d-none d-md-table-cell">
                    <span className="text-body fw-normal">
                      Delivery Address
                    </span>
                  </th>
                  <th scope="col" className="py-3 d-none d-md-table-cell">
                    <span className="text-body fw-normal">Price</span>
                  </th>
                  <th scope="col" className="py-3 d-none d-md-table-cell">
                    <span className="text-body fw-normal">Quantity</span>
                  </th>
                  <th scope="col" className="py-3 d-none d-md-table-cell">
                    <span className="text-body fw-normal">Total</span>
                  </th>
                  <th scope="col" className="py-3">
                    &nbsp;
                  </th>
                </tr>
              </thead>
              <tbody className="text-body-emphasis orders-list">
                {MyList.map((ProductList, i) => (
                  <tr key={ProductList.id} className="p-5">
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      <a
                        className="d-inline-block animate-underline text-body-emphasis text-decoration-none py-2"
                        href="#orderDetails"
                        data-bs-toggle="offcanvas"
                        aria-controls="orderDetails"
                        aria-label="Show order details"
                      >
                        <span className="animate-target">
                          {ProductList.invoice_no}
                        </span>
                      </a>
                      <ul className="list-unstyled fw-normal text-body m-0 d-md-none">
                        <li>Quantity = {ProductList.quantity}</li>
                        <li className="d-flex align-items-center">
                          <span className="bg-info rounded-circle p-1 me-2"></span>
                          {ProductList.order_status}
                        </li>
                        <li className="fw-medium text-body-emphasis">
                          Price = {ProductList.unit_price} x{" "}
                          {ProductList.quantity} = {ProductList.total_price}$
                        </li>
                      </ul>
                    </td>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      {ProductList.product_name}
                    </td>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      {ProductList.order_date}
                    </td>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      <span className="d-flex align-items-center">
                        <span className="bg-info rounded-circle p-1 me-2"></span>
                        {ProductList.order_status}
                      </span>
                    </td>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      {ProductList.payment_method}
                    </td>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      {ProductList.delivery_method}
                    </td>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      {ProductList.delivery_address} | {ProductList.city}
                    </td>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      {ProductList.unit_price}$
                    </td>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      {ProductList.quantity}
                    </td>
                    <td className="fw-medium pt-2 pb-3 py-md-2 ps-0 border">
                      {ProductList.total_price}$
                    </td>
                    <td className="py-3 pe-0 border">
                      <Button
                        onClick={this.ReviewModalOpen.bind(
                          this,
                          ProductList.product_code,
                          ProductList.product_name
                        )}
                        className="btn btn-danger"
                      >
                        Post Review{" "}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    return (
      <Fragment>
        {/* <Container> */}
          <div className="section-title text-center mb-55 p-3">
            <h2>Order History By ( {email} )</h2>
          </div>
          <Card>
            <Card.Body>{MyView}</Card.Body>
          </Card>
        {/* </Container> */}
        <Modal show={this.state.ReviewModal} onHide={this.ReviewModalClose}>
          <Modal.Header closeButton>
            <h6>
              <i className="fa fa-bell"></i> Post Your Review{" "}
            </h6>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Your Name</label>
              <input
                onChange={this.nameOnChange}
                className="form-control"
                type="text"
                placeholder={email}
              />
            </div>

            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Select Product Rating</label>
              <select onChange={this.RatingOnChange} className="form-control">
                <option value="">Choose</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
              <label className="form-label">Your Comment</label>
              <textarea
                onChange={this.CommentOnChanage}
                rows={2}
                className="form-control"
                type="text"
                placeholder="Your Comment"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.PostReview}>
              Post
            </Button>

            <Button variant="secondary" onClick={this.ReviewModalClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}
export default OrderList;
