import "./product.css";

const Product = ({ product }) => {
  return (
    <div className="product">
      <div className="productWrapper">
        <div className="productImg">
          <img src="https://picsum.photos/seed/picsum/400/250" alt="" />
        </div>
        <div className="productDesc">
          <div className="productPrice">{product.price}</div>
          <div className="productName">{product.name}</div>
          <div className="productTextDesc">{product.des}</div>
          <div className="productAmount">
            <span className="productAmountTitle">Amount:</span>
            <span className="productAmountValue">{product.amount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
