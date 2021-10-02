import "./topbar.css";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useRef } from "react";
import { AuthContext } from "./../../contexts/AuthContext";
import { ProductContext } from "./../../contexts/ProductContext";

const Topbar = () => {
  const name = useRef();

  const {
    state: { user },
    logout,
  } = useContext(AuthContext);

  // Context
  const { getProductByName } = useContext(ProductContext);

  const handleLogout = () => {
    logout();
  };

  const handleFindProduct = () => {
    getProductByName(name.current.value);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topbarLeft">
          <div className="topbarLogo">Logo</div>
        </div>
        <div className="topbarCenter">
          <input
            type="text"
            className="topbarSearchInput"
            placeholder="Search product"
            ref={name}
          />
          <SearchIcon
            className="topbarSearchIcon"
            onClick={handleFindProduct}
          />
        </div>
        <div className="topbarRight" onClick={handleLogout}>
          <LogoutIcon className="topbarLogoutIcon" />
          <span className="topbarUsername">
            {user.firstName + " " + user.lastName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
