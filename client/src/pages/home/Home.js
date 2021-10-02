import { useContext, useEffect } from "react";
import Product from "../../components/product/Product";
import Topbar from "../../components/topbar/Topbar";
import "./home.css";
import { ProductContext } from "./../../contexts/ProductContext";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import ModalAddProduct from './../../components/modalAddProduct/ModalAddProduct';

const Home = () => {
  // State set open modal add product
  const [open, setOpen] = useState(false);

  const {
    state: { listProduct },
    getAllProduct,
  } = useContext(ProductContext);

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  } 
  const handleClose = () => {
    setOpen(false);
  } 

  return (
    <div className="home">
      <Topbar />
      <div className="homeContent">
        {listProduct.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="homeAddProduct">
        <AddIcon
          className="homeAddProductIcon"
          onClick={handleOpen}
        />
        <ModalAddProduct open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Home;
