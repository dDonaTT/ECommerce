import React, { Fragment, useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Footer from "../components/common/Footer";
import SuggestedProduct from "../components/ProductDetails/SuggestedProduct";
import axios from "axios";
import AppURL from "../api/AppURL";
import { useParams } from "react-router-dom";
import NavMenuDesktop from "../components/common/NavMenuDesktop";

const ProductDetailsPage = ({ user }) => {
  const [productData, setProductData] = useState(null);
  const { code } = useParams();

  useEffect(() => {
    window.scroll(0, 0);

    const url = AppURL.ProductDetails(code);
    console.log("Request URL:", url);

    axios
      .get(url)
      .then((response) => {
        setProductData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [code]);

  return (
    <Fragment>
      <NavMenuDesktop />
      {productData && <ProductDetails data={productData} user={user} />}
      <SuggestedProduct />
      <div className="Desktop">
        <Footer />
      </div>
    </Fragment>
  );
};

export default ProductDetailsPage;
