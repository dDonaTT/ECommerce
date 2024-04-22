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
        <Col
          key={i.toString()}
          className="p-0"
          xl={2}
          lg={2}
          md={2}
          sm={6}
          xs={6}
        >
          <Card className="image-box card">
            <img className="center" src={prodList.image} />
            <Card.Body>
              <p className="product-name-on-card">
                {prodList.title} -Brand: {prodList.brand}
              </p>
              <p className="product-price-on-card">{prodList.price}$</p>
            </Card.Body>
          </Card>
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
