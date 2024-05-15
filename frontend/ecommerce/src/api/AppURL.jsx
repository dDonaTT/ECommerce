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
  
  static UserLogin = this.BaseURL + "/login";
  static UserData = this.BaseURL + "/user";
  static UserRegister = this.BaseURL + "/register";
  static UserForgetPassword = this.BaseURL + "/forgetpassword";
  static AllSlider = this.BaseURL + "/allslider";
}

export default AppURL;
