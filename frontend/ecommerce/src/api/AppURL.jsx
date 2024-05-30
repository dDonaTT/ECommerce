class AppURL {
  static BaseURL = "http://127.0.0.1:8000/api";
  static AllCategoryDetails = this.BaseURL + "/allcategory";

  static ProductListByRemark(Remark) {
    return this.BaseURL + "/productlistbyremark/" + Remark;
  }

  static ProductListByCategory(category) {
    return this.BaseURL + "/productlistbycategory/" + category;
  }

  static ProductListBySubCategory(category, subcategory) {
    return (
      this.BaseURL + "/productlistbysubcategory/" + category + "/" + subcategory
    );
  }

  static ProductDetails(code) {
    return this.BaseURL + "/productdetails/" + code;
  }

  static OrderListByUser(email) {
    return this.BaseURL + "/orderlistbyuser/" + email;
  }

  static UserLogin = this.BaseURL + "/login";
  static UserData = this.BaseURL + "/user";
  static UserRegister = this.BaseURL + "/register";
  static UserForgetPassword = this.BaseURL + "/forgetpassword";
  static AllSlider = this.BaseURL + "/allslider";
  static PostReview = this.BaseURL + "/postreview";
  static addToCart = this.BaseURL + "/addtocart";

  static CartCount = this.BaseURL + "/cartcount";

  static CartList(email) {
    return this.BaseURL + "/cartlist/" + email;
  }

  static RemoveCartList(id) {
    return this.BaseURL + "/removecartlist/" + id;
  }

  static CartItemPlus(id, quantity, price) {
    return this.BaseURL + "/cartitemplus/" + id + "/" + quantity + "/" + price;
  }

  static CartItemMinus(id, quantity, price) {
    return this.BaseURL + "/cartitemminus/" + id + "/" + quantity + "/" + price;
  }

  static CartOrder = this.BaseURL + "/cartorder";

  static NotificationHistory = this.BaseURL + "/notification";

  static AddFavourite(product_code, email) {
    return this.BaseURL + "/favourite/" + product_code + "/" + email;
  }
}

export default AppURL;
