import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_NAME } from "./type";

export const ProductReducer = (state, action) => {
  const {
    type,
    payload: { listProduct },
  } = action;

  switch (type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        listProduct,
      };

    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        listProduct,
      };

    default:
      return state;
  }
};
