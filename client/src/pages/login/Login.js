import "./login.css";
import { useRef, useState } from "react";
import Register from "../register/Register";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const [open, setOpen] = useState("true");

  const handleCloseModal = () => {
    setOpen(false);
  }

  const handleOpenModal = () => {
    setOpen(true);
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();

    console.log(email.current.value);
    console.log(password.current.value);
  };

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
              type="email"
              className="loginFormInput"
              placeholder="Email"
              required
              ref={email}
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
          <span
            className="loginCreateAccount"
            onClick={handleOpenModal}
          >
            Create an account ?
          </span>
          <Register open={open} handleClose={handleCloseModal} />
        </div>
      </div>
    </div>
  );
};

export default Login;
