import React, { useState, Fragment } from "react";
import axios from "axios";
import NavMenuDesktop from "../../components/common/NavMenuDesktop";
import cogoToast from "cogo-toast";
import AppURL from "../../api/AppURL";
import "../../assets/css/productDetails.css";

const ProductDetails = ({ data, user }) => {
  const { productDetails, productList } = data;

  const [mainImage, setMainImage] = useState(productList[0].image);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(productList[0]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleAddToCart = () => {
    if (!user || !user.email) {
      cogoToast.error("You need to log in to add items to the cart.", {
        position: "top-right",
      });
      return;
    }

    const productCode = selectedProduct.product_code;
    const productTitle = selectedProduct.title;
    const productImage = selectedProduct.image;

    let unitPrice = selectedProduct.discount_price
      ? selectedProduct.discount_price
      : selectedProduct.price;
    let totalPrice = unitPrice * quantity;

    let email = user.email;

    let MyFormData = new FormData();
    MyFormData.append("image", productImage);
    MyFormData.append("email", email);
    MyFormData.append("product_name", productTitle);
    MyFormData.append("product_code", productCode);
    MyFormData.append("size", selectedSize);
    MyFormData.append("color", selectedColor);
    MyFormData.append("quantity", quantity);
    MyFormData.append("unit_price", unitPrice);
    MyFormData.append("total_price", totalPrice);

    console.log("Data being sent to server:", Object.fromEntries(MyFormData));

    axios
      .post(AppURL.addToCart, MyFormData)
      .then((response) => {
        if (response.data.success) {
          cogoToast.success("Product Added Successfully", {
            position: "top-right",
          });
        } else {
          cogoToast.error("Your Request is not done! Try Again", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        console.error(
          "There was an error adding the product to the cart!",
          error
        );
        cogoToast.error("Your Request is not done! Try Again", {
          position: "top-right",
        });
      });
  };

  return (
    <Fragment>
      <NavMenuDesktop />
      <div className="labyrinth-of-details poppins-medium">
        <div className="product-images">
          <img src={mainImage} alt="Main product" className="main-image" />
          <div className="thumbnail-images">
            {productDetails[0].image_one && (
              <img
                src={productDetails[0].image_one}
                alt="Product thumbnail"
                onClick={() => handleImageClick(productDetails[0].image_one)}
              />
            )}
            {productDetails[0].image_two && (
              <img
                src={productDetails[0].image_two}
                alt="Product thumbnail"
                onClick={() => handleImageClick(productDetails[0].image_two)}
              />
            )}
            {productDetails[0].image_three && (
              <img
                src={productDetails[0].image_three}
                alt="Product thumbnail"
                onClick={() => handleImageClick(productDetails[0].image_three)}
              />
            )}
            {productDetails[0].image_four && (
              <img
                src={productDetails[0].image_four}
                alt="Product thumbnail"
                onClick={() => handleImageClick(productDetails[0].image_four)}
              />
            )}
          </div>
        </div>
        <div className="product-details">
          <h1 className="product-name">{selectedProduct.title}</h1>
          <h6 className="section-sub-title">
            {productDetails[0].short_description}
          </h6>
          <div className="product-review">
            <span className="text-success">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </span>
          </div>
          <hr />
          <div className="product-price">
            <div className="discount-price">
              ${selectedProduct.discount_price}
            </div>
            <div className="original-price">${selectedProduct.price}</div>
          </div>
          <h6 className="mt-2">Category: {selectedProduct.category}</h6>
          <h6 className="mt-2">Subcategory: {selectedProduct.subcategory}</h6>
          <hr />
          <h6 className="mt-2">Brand: {selectedProduct.brand}</h6>
          <h6 className="mt-2">Product Code: {selectedProduct.product_code}</h6>
          <hr />
          <h6 className="mt-2">Choose Color</h6>
          <select onChange={(e) => setSelectedColor(e.target.value)}>
            <option value="">Select Color</option>
            {productDetails[0].color.split(",").map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
          <div className="product-size">
            <h6>Choose Size:</h6>
            <select onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Select Size</option>
              {productDetails[0].size.split(",").map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="product-quantity">
            <h6>Choose Quantity:</h6>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
          </div>
          <div className="product-buttons poppins-medium">
            <button className="buy-now">Buy Now</button>
            <button className="add-to-cart" onClick={handleAddToCart}>
              <i className="fa fa-shopping-cart"></i> Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="additional-details poppins-medium">
        <h6 className="mt-2">DETAILS</h6>
        <p>{productDetails[0].long_description}</p>
        <h6 className="mt-2">REVIEWS</h6>
        <p className="p-0 m-0">
          <span className="Review-Title">Kazi Ariyan</span>
          <span className="text-success">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </p>
        <p className="p-0 m-0">
          <span className="Review-Title">Kazi Ariyan</span>
          <span className="text-success">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </p>
        <p className="p-0 m-0">
          <span className="Review-Title">Kazi Ariyan</span>
          <span className="text-success">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </p>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
