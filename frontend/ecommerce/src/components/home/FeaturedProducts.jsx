import React, { Component, Fragment } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import { Link } from 'react-router-dom'

class FeaturedProducts extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
    };
  }

  componentDidMount() {
    axios.get(AppURL.ProductListByRemark("FEATURED")).then((response) => {
        this.setState({ ProductData: response.data });
        console.log({ ProductData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    const prodList = this.state.ProductData;

    const View = prodList.map((prodList, i) => {
      return (
        <Col key={i.toString()} className="p-2" xl={2} lg={3} md={4} sm={4} xs={10}>
          <Link to={"/productdetails/" + prodList.id} style={{ textDecoration: 'none' }}>
            <Card className="product-card">
              <div className="image-container">
                <img className="center product-image" src={prodList.image} alt={prodList.title} />
                <button className="favorite-button">❤️</button>
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h3 className="product-name">{prodList.title}</h3>
                    <span className="product-price">${prodList.price}</span>
                  </div>
                  <p className="product-rating">⭐ {prodList.rating?.rate}</p>
                </div>
                <button className="add-to-cart">Add to Cart</button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      );
    });
    return (
      <Fragment>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>Featured Products</h2>
            <p>Exclusive Collection</p>
          </div>
          <Row>
            {View}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default FeaturedProducts;