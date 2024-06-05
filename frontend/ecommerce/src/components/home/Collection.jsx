import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AppURL from "../../api/AppURL";
import axios from "axios";
import { Link } from "react-router-dom";

class Collection extends Component {
  constructor() {
    super();
    this.state = {
      ProductData: [],
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.ProductListByRemark("COLLECTION"))
      .then((response) => {
        this.setState({ ProductData: response.data });
      })
      .catch((error) => {});
  }

  render() {
    const CollectionList = this.state.ProductData;
    const MyView = CollectionList.map((product, i) => {
      if (product.special_price === "na") {
        return (
        <Col key={i.toString()} className="p-2" xl={2} lg={3} md={4} sm={4} xs={10}>
          <Link to={"/productdetails/" + product.id} style={{ textDecoration: 'none' }}>
            <Card className="product-card">
              <div className="image-container">
                <img className="center product-image" src={product.image} alt={product.title} />
                <button className="favorite-button">❤️</button>
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h3 className="product-name">{product.title}</h3>
                    <span className="product-price">${product.price}</span>
                  </div>
                  <p className="product-rating">⭐ {product.rating?.rate}</p>
                </div>
                <button className="add-to-cart">Add to Cart</button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        );
      } else {
        return (
        <Col key={i.toString()} className="p-2" xl={2} lg={3} md={4} sm={4} xs={10}>
          <Link to={"/productdetails/" + product.id} style={{ textDecoration: 'none' }}>
            <Card className="product-card">
              <div className="image-container">
                <img className="center product-image" src={product.image} alt={product.title} />
                <button className="favorite-button">❤️</button>
              </div>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h3 className="product-name">{product.title}</h3>
                    <span className="product-price">${product.price}</span>
                  </div>
                  <p className="product-rating">⭐ {product.rating?.rate}</p>
                </div>
                <button className="add-to-cart">Add to Cart</button>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        );
      }
    });

    return (
      <Fragment>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>PRODUCT COLLECTION</h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>

          <Row className="justify-content-center">{MyView}</Row>
        </Container>
      </Fragment>
    );
  }
}

export default Collection;
