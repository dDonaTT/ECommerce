import React, { Component } from "react";
import { Fragment } from "react";
import AppURL from "../api/AppURL";

import NavMenuDesktop from "../components/common/NavMenuDesktop";

import axios from "axios";
import SearchList from "../components/ProductDetails/SearchList";

class SearchPage extends Component {
  constructor({ match }) {
    super();
    this.state = {
      SearchKey: match.params.searchkey,
      ProductData: [],
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    // alert(this.state.Category);
    axios
      .get(AppURL.ProductBySearch(this.state.SearchKey))
      .then((response) => {
        this.setState({ ProductData: response.data });
      })
      .catch((error) => {});
  }

  render() {
    return (
      <Fragment>
        <div className="Desktop">
          <NavMenuDesktop />
        </div>

        <SearchList
          SearchKey={this.state.SearchKey}
          ProductData={this.state.ProductData}
        />
      </Fragment>
    );
  }
}

export default SearchPage;
