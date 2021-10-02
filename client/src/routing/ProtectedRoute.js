import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "./../contexts/AuthContext";
import "./protectedRoute.css";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    state: { isLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (isLoading) {
    return (
      <Box className="spinner">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
