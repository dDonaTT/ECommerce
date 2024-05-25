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
          <Col key={i} className="p-2" xl={3} lg={3} md={4} sm={6} xs={12}>
            <Link to={"/productdetails/" + product.id}>
              <Card className="image-box card w-100">
                <img className="center w-75" src={product.image} alt={product.title} />
                <Card.Body>
                  <p className="product-name-on-card">{product.title}</p>
                  <p className="product-price-on-card">Price : ${product.price}</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      } else {
        return (
          <Col key={i} className="p-2" xl={3} lg={3} md={4} sm={6} xs={12}>
            <Link to={"/productdetails/" + product.id}>
              <Card className="image-box card w-100">
                <img className="center w-75" src={product.image} alt={product.title} />
                <Card.Body>
                  <p className="product-name-on-card">{product.title}</p>
                  <p className="product-price-on-card">
                    Price : <strike className="text-secondary">${product.price}</strike> ${product.special_price}
                  </p>
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
