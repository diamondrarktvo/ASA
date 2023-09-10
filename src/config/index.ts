export default {
  //url de base
  BASE_URL: process.env.EXPO_PUBLIC_API_HOST + "/api",

  /*==== USER ===*/
  //login
  LOGIN_URL: "/user/auth",

  //register
  REGISTER_URL: "/user",

  //update
  UPDATE_URL: "/user",

  /*==== CATEGORY ===*/
  //GET
  GET_CATEGORY_URL: "/category",

  /**==== SUBCATEGORY ==== */
  GET_SUB_CATEGORY_URL: "/subcategory/",

  /**==== CRITERIA ==== */
  GET_CRITERIA_URL: "/criteria/",

  /*===== PRODUCT =====*/
  //GET
  GET_PRODUCT_URL: "/product",

  //POST
  POST_PRODUCT_URL: "/product",

  /**==== PAYMENT ===== */
  //POST
  POST_PAYMENT_METHOD_URL: "/payementmethod",

  //GET ALL
  GET_PAYMENT_METHOD_URL: "/payementmethod",
};
