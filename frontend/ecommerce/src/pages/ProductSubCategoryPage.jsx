import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppURL from "../api/AppURL";

import NavMenuDesktop from "../components/common/NavMenuDesktop";

import axios from "axios";
import SubCategory from "../components/ProductDetails/SubCategory";

const ProductSubCategoryPage = () => {
  const { category, subcategory } = useParams();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
    axios
      .get(AppURL.ProductListBySubCategory(category, subcategory))
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category, subcategory]);

  return (
    <React.Fragment>
      <div className="Desktop">
        <NavMenuDesktop />
      </div>

      <SubCategory
        Category={category}
        SubCategory={subcategory}
        ProductData={productData}
      />
    </React.Fragment>
  );
};

export default ProductSubCategoryPage;
