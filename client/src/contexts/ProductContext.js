import { createContext, useReducer } from "react";
import { ProductReducer } from "./../reducers/ProductReducer";
import axios from "axios";
import { apiUrl } from "./constants";
import { GET_ALL_PRODUCTS } from "../reducers/type";
import { GET_PRODUCT_BY_NAME } from "./../reducers/type";

const inittialState = {
  listProduct: [],
};

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, inittialState);

  // Get all products
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}/product`);
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: {
          listProduct: res.data.products,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Get product by name use mysql
  // const getProductByName = async (name) => {
  //   try {
  //     // const res = await axios.get(`${apiUrl}/product/${name}`);
  //     const res = await axios.post(`${apiUrl}/product/find/name`, { name });
  //     dispatch({
  //       type: GET_PRODUCT_BY_NAME,
  //       payload: {
  //         listProduct: res.data.products,
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // Get product by name use mongooDB
  const getProductByName = async (name) => {
    try {
      // const res = await axios.get(`${apiUrl}/product/${name}`);
      const res = await axios.get(`${apiUrl}/product/getbyname/${name}`);
      dispatch({
        type: GET_PRODUCT_BY_NAME,
        payload: {
          listProduct: res.data.products,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Create product
  const createProduct = async (product) => {
    try {
      const res = await axios.post(`${apiUrl}/product/`, product);
      if (res.data.success) getAllProduct();
      return res.data.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const ProductContextData = {
    state,
    getAllProduct,
    getProductByName,
    createProduct,
  };

  return (
    <ProductContext.Provider value={ProductContextData}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
