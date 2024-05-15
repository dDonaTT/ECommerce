import React, { Component, Fragment } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import MegaMenu from "./MegaMenu";
import HomeSlider from "./HomeSlider";
import AppURL from "../../api/AppURL";
import axios from "axios";

class HomeTop extends Component {
  constructor() {
    super();
    this.state = {
      MenuData: [],
      SliderData: [],
    };
  }

  componentDidMount() {
    axios
      .get(AppURL.AllCategoryDetails)
      .then((response) => {
        this.setState({ MenuData: response.data });
      })
      .catch((error) => {});

    axios
      .get(AppURL.AllSlider)
      .then((response) => {
        this.setState({ SliderData: response.data });
      })
      .catch((error) => {});
  }

  render() {
    return (
      <Fragment>
        <Container className="overflow-hidden" fluid={true}>
          <Row>
            {/* <Col lg={3} md={3} sm={12}>
                              
                              </Col> */}
            <MegaMenu data={this.state.MenuData} />
            {/* <Col lg={9} md={9} sm={12}> */}
            <HomeSlider data={this.state.SliderData} />
            {/* </Col> */}
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default HomeTop;
