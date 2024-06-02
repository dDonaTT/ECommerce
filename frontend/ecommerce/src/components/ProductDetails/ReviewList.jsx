import React, { Component, Fragment } from "react";
import axios from "axios";
import AppURL from "../../api/AppURL";

class ReviewList extends Component {
  constructor() {
    super();
    this.state = {
      ReviewData: [],
    };
  }

  componentDidMount() {
    let code = this.props.productCode;

    axios
      .get(AppURL.ReviewList(code))
      .then((response) => {
        this.setState({ ReviewData: response.data });
      })
      .catch((error) => {});
  }

  render() {
    const MyList = this.state.ReviewData;

    if (MyList.length > 0) {
      const MyView = MyList.map((review, i) => {
        const ratingStars = [];
        for (let j = 0; j < review.reviewer_rating; j++) {
          ratingStars.push(<i className="fa fa-star" key={j}></i>);
        }

        return (
          <div key={i}>
            <p className="p-0 m-0">
              <span className="Review-Title">{review.reviewer_name}</span>{" "}
              <span className="text-success">{ratingStars}</span>
            </p>
            <p>{review.reviewer_comments}</p>
          </div>
        );
      });

      return (
        <div>
          <h6 className="mt-2">REVIEWS</h6>
          {MyView}
        </div>
      );
    } else {
      return (
        <div>
          <h6 className="mt-2">REVIEWS</h6>
          <p>There have no reviews yet.</p>
        </div>
      );
    }
  }
}

export default ReviewList;
