import React, { Component, Fragment } from "react";
import { Col, Container, Row, Card, Spinner } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import AppURL from "../../api/AppURL";

class NewArrival extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductData: [],
      isLoading:true
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  componentDidMount() {
    axios.get(AppURL.ProductListByRemark("NEW")).then((response) => {
        this.setState({ ProductData: response.data });
        this.setState({ isLoading: false });
        console.log({ ProductData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    const CollectionList = this.state.ProductData;

    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <Col
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </Col>
      );
    }

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
            <h2>NEW ARRIVAL &nbsp;</h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>
          {/* <Slider ref={(c) => (this.slider = c)} {...settings}> */}
          <Row className="justify-content-center">{MyView}</Row>
          {/* </Slider> */}
        </Container>
      </Fragment>
    );
  }
}

export default NewArrival;
