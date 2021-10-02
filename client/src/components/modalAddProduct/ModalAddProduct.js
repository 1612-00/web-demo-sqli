import "./modalAddProduct.css";
import { useContext, useRef, useState } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import { ProductContext } from "./../../contexts/ProductContext";
import NotificationDialog from "../notificationDialog/NotificationDialog";

const ModalAddProduct = ({ open, handleClose }) => {
  const [openNoti, setOpenNoti] = useState(false);
  const [statusNoti, setStatusNoti] = useState("");
  const [contentNoti, setContentNoti] = useState("");

  const name = useRef();
  const amount = useRef();
  const price = useRef();
  const desc = useRef();

  // Context
  const { createProduct } = useContext(ProductContext);

  const handleCloseNoti = () => {
    setOpenNoti(false);
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();

    const product = {
      name: name.current.value,
      amount: amount.current.value,
      price: price.current.value,
      des: desc.current.value,
    };

    try {
      const res = await createProduct(product);

      if (res) {
        setStatusNoti("done");
        setContentNoti("Add Product Successfully");
        setOpenNoti(true);
      } else {
        setStatusNoti("error");
        setContentNoti("Add Product Un Successfully");
        setOpenNoti(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogContent>
        <span className="modalAddProductTitle">Add Product</span>
        <form className="modalAddProductForm" onSubmit={handleCreateProduct}>
          <input
            type="text"
            className="modalAddProductInput"
            placeholder="Name"
            ref={name}
            required
          />
          <input
            type="text"
            className="modalAddProductInput"
            placeholder="Amount"
            ref={amount}
            required
          />
          <input
            type="text"
            className="modalAddProductInput"
            placeholder="Price"
            ref={price}
            required
          />
          <input
            type="text"
            className="modalAddProductInput"
            placeholder="Description"
            ref={desc}
            required
          />
          <button className="modalAddProductBtn" type="submit">
            Add
          </button>
        </form>
        <NotificationDialog
          status={statusNoti}
          open={openNoti}
          handleClose={handleCloseNoti}
          content={contentNoti}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddProduct;
