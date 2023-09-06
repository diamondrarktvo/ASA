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

  /*===== PRODUCT =====*/
  //GET
  GET_PRODUCT_URL: "/product",

  //POST
  POST_PRODUCT_URL: "/product",
};
