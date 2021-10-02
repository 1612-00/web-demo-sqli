import "./register.css";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "./../../contexts/AuthContext";
import { Dialog, DialogContent } from "@material-ui/core";
import NotificationDialog from "./../../components/notificationDialog/NotificationDialog";

const Register = ({ open, handleClose }) => {
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const password = useRef();

  const [openErrDialog, setOpenErrDialog] = useState(false);

  const handleOpenErrModal = () => {
    setOpenErrDialog(true);
  };

  const handleCloseErrModal = () => {
    setOpenErrDialog(false);
  };

  // Context
  const { registerUser } = useContext(AuthContext);

  const handleSignUp = async (event) => {
    event.preventDefault();

    const user = {
      firstName: firstName.current.value.trim(),
      lastName: lastName.current.value.trim(),
      username: username.current.value.trim(),
      password: password.current.value,
    };

    try {
      const registerData = await registerUser(user);
      if (!registerData.success) {
        handleOpenErrModal();
      } else {
        handleClose();
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
        <span className="registerTitle">Sign Up</span>
        <form className="registerForm" onSubmit={handleSignUp}>
          <div className="inputNames">
            <input
              type="text"
              className="registerInput inputFirstName"
              placeholder="First name"
              ref={firstName}
              required
            />
            <input
              type="text"
              className="registerInput"
              placeholder="Last name"
              ref={lastName}
              required
            />
          </div>
          <input
            type="text"
            className="registerInput"
            placeholder="username"
            ref={username}
            required
          />
          <input
            type="password"
            className="registerInput"
            placeholder="Password"
            ref={password}
            required
            minLength="6"
          />
          <button className="registerBtn" type="submit">
            Sign up
          </button>
        </form>
        <NotificationDialog
          status="error"
          open={openErrDialog}
          handleClose={handleCloseErrModal}
          content="Account registration failed"
        />
      </DialogContent>
    </Dialog>
  );
};

export default Register;
