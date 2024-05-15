// import React, { Component, Fragment, useState } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Product1 from "../../assets/images/product/product1.png";
// import Product2 from "../../assets/images/product/product2.png";
// import Product3 from "../../assets/images/product/product3.png";
// import Product4 from "../../assets/images/product/product4.png";
// import NavMenuDesktop from "../../components/common/NavMenuDesktop";
// import '../../assets/css/productDetails.css';

// class ProductDetails extends Component {
//   render() {
//     const { productDetails, productList } = this.props.data;

//     return (
//       <Fragment>
//         <NavMenuDesktop />
//         <ProductPage productDetails={productDetails[0]} productList={productList[0]} />
//         <Container fluid={true} className="BetweenTwoSection">
//           <Row className="p-2">
//             <Col className="shadow-sm bg-white pb-3 mt-4" md={12} lg={12} sm={12} xs={12}>
//               <Row>
//                 <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
//                   <img className="w-100 main-image" src={productDetails[0].image_one} alt="Main product" />
//                   <Container className="my-3">
//                     <Row>
//                       <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
//                         <img className="w-100 thumbnail-image" src={productDetails[0].image_one} alt="Product thumbnail" />
//                       </Col>
//                       <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
//                         <img className="w-100 thumbnail-image" src={productDetails[0].image_two} alt="Product thumbnail" />
//                       </Col>
//                       <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
//                         <img className="w-100 thumbnail-image" src={productDetails[0].image_three} alt="Product thumbnail" />
//                       </Col>
//                       <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
//                         <img className="w-100 thumbnail-image" src={productDetails[0].image_four} alt="Product thumbnail" />
//                       </Col>
//                     </Row>
//                   </Container>
//                 </Col>
//                 <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
//                   <h5 className="Product-Name">{productList[0].title}</h5>
//                   <h6 className="section-sub-title">{productDetails[0].short_description}</h6>
//                   <div className="input-group">
//                     <div className="Product-price-card d-inline">${productList[0].price}</div>
//                     <div className="Product-price-card d-inline">${productList[0].discount_price}</div>
//                     <h6 className="mt-2">Category: {productList[0].category}</h6>
//                     <h6 className="mt-2">Subcategory: {productList[0].subcategory}</h6>
//                     <h6 className="mt-2">Brand: {productList[0].brand}</h6>
//                     <h6 className="mt-2">Product_code: {productList[0].product_code}</h6>
//                   </div>
//                   <h6 className="mt-2">Choose Color</h6>
//                   <select>
//                     {productDetails[0].color.split(',').map((color, index) => (
//                       <option key={index} value={color}>{color}</option>
//                     ))}
//                   </select>
//                   <h6 className="mt-2">Choose Size</h6>
//                   <div className="input-group mt-3">
//                     <button className="btn site-btn m-1"><i className="fa fa-shopping-cart"></i> Add To Cart</button>
//                     <button className="btn btn-primary m-1"><i className="fa fa-car"></i> Order Now</button>
//                     <button className="btn btn-primary m-1"><i className="fa fa-heart"></i> Favourite</button>
//                   </div>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col className="" md={6} lg={6} sm={12} xs={12}>
//                   <h6 className="mt-2">DETAILS</h6>
//                   <p>{productDetails[0].long_description}</p>
//                 </Col>
//                 <Col className="" md={6} lg={6} sm={12} xs={12}>
//                   <h6 className="mt-2">REVIEWS</h6>
//                   <p className="p-0 m-0">
//                     <span className="Review-Title">Kazi Ariyan</span>
//                     <span className="text-success">
//                       <i className="fa fa-star"></i>
//                       <i className="fa fa-star"></i>
//                       <i className="fa fa-star"></i>
//                       <i className="fa fa-star"></i>
//                     </span>
//                   </p>
//                   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
//                   <p className="p-0 m-0">
//                     <span className="Review-Title">Kazi Ariyan</span>
//                     <span className="text-success">
//                       <i className="fa fa-star"></i>
//                       <i className="fa fa-star"></i>
//                       <i className="fa fa-star"></i>
//                       <i className="fa fa-star"></i>
//                     </span>
//                   </p>
//                   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
//                   <p className="p-0 m-0">
//                     <span className="Review-Title">Kazi Ariyan</span>
//                     <span className="text-success">
//                       <i className="fa fa-star"></i>
//                       <i className="fa fa-star"></i>
//                       <i className="fa fa-star"></i>
//                       <i className="fa fa-star"></i>
//                     </span>
//                   </p>
//                   <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Container>
//       </Fragment>
//     );
//   }
// }

// export default ProductDetails;

// import React, { useState, Fragment } from "react";
// import NavMenuDesktop from "../../components/common/NavMenuDesktop";
// import '../../assets/css/productDetails.css';

// const ProductDetails = () => {
//   const [mainImage, setMainImage] = useState("image1.jpg");

//   const handleImageClick = (image) => {
//     setMainImage(image);
//   };

//   return (
//     <Fragment>
//       <NavMenuDesktop />
//       <div className="product-page">
//         <div className="product-images">
//           <img src="https://via.placeholder.com/500" alt="Main product" className="main-image" />
//           <div className="thumbnail-images">
//             <img src="https://via.placeholder.com/500" alt="Product thumbnail" onClick={() => handleImageClick('image1.jpg')} />
//             <img src="https://via.placeholder.com/500" alt="Product thumbnail" onClick={() => handleImageClick('image2.jpg')} />
//             <img src="https://via.placeholder.com/500" alt="Product thumbnail" onClick={() => handleImageClick('image3.jpg')} />
//             <img src="https://via.placeholder.com/500" alt="Product thumbnail" onClick={() => handleImageClick('image4.jpg')} />
//           </div>
//         </div>
//         <div className="product-details">
//           <h1 className="product-name">Product Name</h1>
//           <p className="product-description">This is a short description of the product.</p>
//           <div className="product-review">⭐⭐⭐⭐⭐</div>
//           <div className="product-price">
//             <span className="discount-price">$19.99</span>
//             <span className="original-price">$29.99</span>
//           </div>
//           <div className="product-options">
//             <div className="product-color">
//               <label>Choose Color:</label>
//               <select>
//                 <option>Red</option>
//                 <option>Blue</option>
//                 <option>Green</option>
//               </select>
//             </div>
//             <div className="product-size">
//               <label>Choose Size:</label>
//               <div className="size-controls">
//                 <button>-</button>
//                 <span>1</span>
//                 <button>+</button>
//               </div>
//             </div>
//           </div>
//           <div className="product-buttons">
//             <button className="buy-now">Buy Now</button>
//             <button className="add-to-cart">Add To Cart</button>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProductDetails;
import React, { useState, Fragment } from "react";
import NavMenuDesktop from "../../components/common/NavMenuDesktop";
import "../../assets/css/productDetails.css";

const ProductDetails = ({ data }) => {
  const { productDetails, productList } = data;

  // State for selected product image
  const [mainImage, setMainImage] = useState(productList[0].image);
  const [quantity, setQuantity] = useState(1);

  // Function to handle thumbnail image click
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
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
          <h1 className="product-name">{productList[0].title}</h1>
          <h6 className="section-sub-title">
            {productDetails[0].short_description}
          </h6>
          <div className="product-review"><span className="text-success">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </span></div>
          <hr />
          <div className="product-price">
            <div className="discount-price">
              ${productList[0].discount_price}
            </div>
            <div className="original-price">${productList[0].price}</div>
          </div>
          <h6 className="mt-2">Category: {productList[0].category}</h6>
          <h6 className="mt-2">Subcategory: {productList[0].subcategory}</h6>
          <hr />
          <h6 className="mt-2">Brand: {productList[0].brand}</h6>
          <h6 className="mt-2">Product Code: {productList[0].product_code}</h6>
          <hr />
          <h6 className="mt-2">Choose Color</h6>
          <select>
            {productDetails[0].color.split(",").map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
          <div className="product-size">
              <h6>Choose Size:</h6>
              <div className="size-controls">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>
          <div className="product-buttons poppins-medium">
            <button className="buy-now">Buy Now</button>
            <button className="add-to-cart">
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
