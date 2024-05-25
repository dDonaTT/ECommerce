import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
      isLoading: true, // Change initial isLoading state to true
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.CartList(this.props.user.email))
      .then((response) => {
        console.log("Cart API Response:", response.data); // Log the API response
        this.setState({
          ProductData: response.data,
          isLoading: false, // Set isLoading to false when data is fetched
        });
      })
      .catch((error) => {
        console.log("Error fetching cart data:", error); // Log any errors
        this.setState({ isLoading: false }); // Set isLoading to false on error
      });
  }

  render() {
    const { ProductData, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>; // Show loading indicator while fetching data
    }

    return (
      <Fragment>
        <Container>
          <div className="section-title text-center mb-55">
            <h2>Product Cart List</h2>
          </div>

          {ProductData.length > 0 ? (
            <Row>
              {ProductData.map((product, index) => (
                <Col key={index} className="p-1" lg={12} md={12} sm={12} xs={12}>
                  <Card>
                    <Card.Body>
                      {/* Render product details here */}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div>No products in the cart</div> // Show message if cart is empty
          )}
        </Container>
      </Fragment>
    );
  }
}

export default Cart;
