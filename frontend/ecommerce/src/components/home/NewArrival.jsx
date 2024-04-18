import React, { Component, Fragment } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class NewArrival extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
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

    return (
      <Fragment>
        <Container className="text-center" fluid={true}>
          <div className="section-title text-center mb-55">
            <h2>
              NEW ARRIVAL &nbsp;
              <a className="btn btn-sm ml-2 site-btn" onClick={this.previous}>
                <i className="fa fa-angle-left"></i>
              </a>
              &nbsp;
              <a className="btn btn-sm ml-2 site-btn" onClick={this.next}>
                <i className="fa fa-angle-right"></i>
              </a>
            </h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>

          <Row>
            <Slider ref={(c) => (this.slider = c)} {...settings}>
              <div>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/u/x/t/1-ht-9151-hsnt-men-original-imagypwkgyhr35yx.jpeg?q=70"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/u/p/d/1-vn70-vinsu-sales-men-original-imagufhg9ggcb8kg.jpeg?q=70"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/6/z/q/1-jk10888-grs-men-original-imagy6fwzmqgzr8h.jpeg?q=70"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-watch/d/u/t/1-lr86-kestrel-men-original-imagrpteyttmf7gu.jpeg?q=70"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim2.flixcart.com/image/612/612/l3es13k0/watch/y/w/d/1-2038-olive-fogg-men-original-imagejcvgvufwqrz.jpeg?q=70"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/i/a/h/1-day-date-display-black-dial-ht-gr007-hamt-watches-men-original-imagwfcthrv2ztnx.jpeg?q=70"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim2.flixcart.com/image/612/612/khp664w0-0/watch/h/9/7/ls2729-limestone-original-imafxngjhgefguz5.jpeg?q=70"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </div>
              <div>
                <Card className="image-box card">
                  <img
                    className="center"
                    src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/x/g/c/otus0002-limestone-men-original-imagpfpyv2z7ftms.jpeg?q=70"
                  />
                  <Card.Body>
                    <p className="product-name-on-card">
                      Realme C21 (Cross Black, 64 GB)
                    </p>
                    <p className="product-price-on-card">Price : $120</p>
                  </Card.Body>
                </Card>
              </div>
            </Slider>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default NewArrival;
