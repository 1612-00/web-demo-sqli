import "./login.css";
import { useContext, useRef, useState } from "react";
import Register from "../register/Register";
import { AuthContext } from "./../../contexts/AuthContext";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { Redirect } from "react-router";
import NotificationDialog from "../../components/notificationDialog/NotificationDialog";

const Login = () => {
  const username = useRef();
  const password = useRef();

  // Context
  const {
    state: { isLoading, isAuthenticated },
    loginUser,
  } = useContext(AuthContext);

  // Handle register
  const [open, setOpen] = useState(false);
  const [openErrDialog, setOpenErrDialog] = useState(false);

  const handleCloseRegisterModal = () => {
    setOpen(false);
  };

  const handleOpenRegisterModal = () => {
    setOpen(true);
  };

  const handleOpenErrModal = () => {
    setOpenErrDialog(true);
  };

  const handleCloseErrModal = () => {
    setOpenErrDialog(false);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    const user = {
      username: username.current.value,
      password: password.current.value,
    };

    try {
      const loginData = await loginUser(user);
      if (!loginData.success) {
        console.log("Login failed");
        handleOpenErrModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <Box className="spinner">
        <CircularProgress />
      </Box>
    );
  } else if (isAuthenticated) {
    return <Redirect to="/" />;
  } else
    return (
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <span className="loginTextMain">Login</span>
            <span className="loginTextSub">Login to use more utilities</span>
          </div>
          <div className="loginRight">
            <form className="loginForm" onSubmit={handleSubmitForm}>
              <input
                type="text"
                className="loginFormInput"
                placeholder="Username"
                required
                ref={username}
              />
              <input
                type="password"
                className="loginFormInput"
                placeholder="Password"
                minLength="6"
                required
                ref={password}
              />
              <button type="submit" className="loginFormBtn">
                Submit
              </button>
            </form>
            <div
              className="loginCreateAccount"
              onClick={handleOpenRegisterModal}
            >
              <span className="loginCreateAccountText">
                Create an account ?
              </span>
            </div>
            <Register open={open} handleClose={handleCloseRegisterModal} />
            <NotificationDialog
              status="error"
              open={openErrDialog}
              handleClose={handleCloseErrModal}
              content="Wrong account or password"
            />
          </div>
        </div>
      </div>
    );
};

export default Login;
