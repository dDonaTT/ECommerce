import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppURL from "../api/AppURL";
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import Category from "../components/home/Category";
import axios from "axios";

const ProductCategoryPage = () => {
  const { category } = useParams();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductListByCategory(category))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);

  return (
    <React.Fragment>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>
      <Category Category={category} ProductData={productData} />
    </React.Fragment>
  );
};

export default ProductCategoryPage;
