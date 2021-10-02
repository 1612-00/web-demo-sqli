import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
// import { useContext } from "react";
// import { AuthContext } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./routing/ProtectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <ProtectedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
