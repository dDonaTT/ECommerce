import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import cogoToast from "cogo-toast";
import { Navigate } from "react-router-dom"; // Import Navigate

class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
      isLoading: "",
      mainDiv: "d-none",
      redirect: false, // State to handle redirection
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    axios
      .get(AppURL.FavouriteList(this.props.user.email))
      .then((response) => {
        this.setState({
          ProductData: response.data,
          isLoading: "d-none",
          mainDiv: "",
        });
      })
      .catch((error) => {
        cogoToast.error("Failed to fetch favourite items", {
          position: "top-right",
        });
      });
  }

  removeItem = (event) => {
    let product_code = event.target.getAttribute("data-code");
    let email = this.props.user.email;

    axios
      .get(AppURL.FavouriteRemove(product_code, email))
      .then((response) => {
        cogoToast.success("Product Item Removed", { position: "top-right" });
        this.componentDidMount(); // Refresh the list after removing an item
      })
      .catch((error) => {
        cogoToast.error("Your Request is not done! Try Again", {
          position: "top-right",
        });
      });
  };

  render() {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />; // Use Navigate component for redirection
    }

    const FevList = this.state.ProductData;
    const MyView = FevList.map((ProductList, i) => {
      return (
        <Col className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} key={i}>
          <Card className="image-box card w-100">
            <img className="center w-75" src={ProductList.image} alt={ProductList.product_name} />
            <Card.Body>
              <p className="product-name-on-card">{ProductList.product_name}</p>
              <Button
                onClick={this.removeItem}
                data-code={ProductList.product_code}
                className="btn btn-sm"
              >
                <i className="fa fa-trash-alt"></i> Remove
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });

    return (
      <Fragment>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2> MY FAVOURITE ITEMS</h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>

          <Row>{MyView}</Row>
        </Container>
      </Fragment>
    );
  }
}

export default Favourite;
