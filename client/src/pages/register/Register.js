import "./register.css";
import { useRef } from "react";
import {
  Dialog,
  DialogContent,
} from "@material-ui/core";

const Register = ({ open, handleClose }) => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();

  const handleSignUp = (event) => {
    event.preventDefault();
    handleClose();
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    console.log(user);
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
            type="email"
            className="registerInput"
            placeholder="Email"
            ref={email}
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
      </DialogContent>
    </Dialog>
  );
};

export default Register;
