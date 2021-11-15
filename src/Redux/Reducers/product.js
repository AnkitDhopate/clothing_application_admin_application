import { productConstants } from "../Constants/constants";

const initState = {
  products: [],
  loading: false,
  error: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_REQUEST:
      state = { ...state, loading: true };
      break;

    case productConstants.GET_ALL_PRODUCTS_SUCCCESS:
      state = {
        ...state,
        loading: false,
        products: action.payload.products,
      };
      break;

    case productConstants.GET_ALL_PRODUCTS_REQUEST:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    case productConstants.CREATE_NEW_PRODUCT_REQUEST:
      state = { ...state, loading: true };
      break;

    case productConstants.CREATE_NEW_PRODUCT_SUCCESS:
      const newProduct = action.payload.createdProduct;
      const updatedProductList = [...state.products, newProduct];

      state = {
        ...state,
        loading: false,
        products: updatedProductList,
      };
      break;

    case productConstants.CREATE_NEW_PRODUCT_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;

    case productConstants.DELETE_PRODUCTS_REQUEST:
      state = { ...state, loading: true };
      break;

    case productConstants.DELETE_PRODUCTS_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case productConstants.DELETE_PRODUCTS_FAILURE:
      state = { ...state, loading: false, error: action.payload.error };
      break;
  }

  return state;
};
