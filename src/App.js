import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/home/home";
import Header from "./components/header/header";
import Booking from "./components/booking/booking";
import Login from "./components/login/login";
import Hotels from "./components/hotels/hotels";
import PrivateRoute from "./components/privateroute/privateroute";
export const UserContext = createContext();

function App() {
  const [placeData, setPlaceData] = useState({});
  const [user, setUser] = useState({
    isSignIn: false,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
  });
  return (
    <React.Fragment>
      <UserContext.Provider
        value={{
          placeDataPass: [placeData, setPlaceData],
          userPass: [user, setUser],
        }}
      >
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/booking/:placename">
              <Booking />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/hotels/:placename">
              <Hotels />
            </PrivateRoute>
          </Switch>
        </Router>
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
