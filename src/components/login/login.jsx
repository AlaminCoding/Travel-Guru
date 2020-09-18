import React, { useContext, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { Button, Col, Row, Form, Alert } from "react-bootstrap";
import "./login.css";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
firebase.initializeApp(firebaseConfig);
const Login = () => {
  const { userPass } = useContext(UserContext);
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  const [isMember, setIsMember] = useState(true);
  const [user, setUser] = userPass;
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const formatMemberStatus = () => {
    setIsMember(!isMember);
  };
  const formatButton = () => {
    return isMember === false ? "Creat an account" : "Login";
  };
  const formatTitle = () => {
    return isMember ? "Login" : "Create an account";
  };
  const formatToggleText = () => {
    return isMember === false ? (
      <p className="text-center mt-2">
        Already a member ? <span onClick={formatMemberStatus}>Login</span>
      </p>
    ) : (
      <p className="text-center mt-2">
        Don't have an account ?
        <span onClick={formatMemberStatus}>Create Account</span>
      </p>
    );
  };
  const handleGoogleAuth = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function (result) {
        var user = result.user;
        let newUser = {
          isSignIn: true,
          firstname: user.displayName,
          lastname: "",
          email: user.email,
          password: "",
          error: "",
        };
        setUser(newUser);
        history.replace(from);
      })
      .catch(function (error) {
        var errorMessage = error.message;
        let newUser = { ...user };
        newUser.error = errorMessage;
        setUser(newUser);
      });
  };

  const handleFacebookAuth = () => {
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then(function (result) {
        var user = result.user;
        let newUser = {
          isSignIn: true,
          firstname: user.displayName,
          lastname: "",
          email: user.email,
          password: "",
          error: "",
        };
        setUser(newUser);
        history.replace(from);
      })
      .catch(function (error) {
        var errorMessage = error.message;
        let newUser = { ...user };
        newUser.error = errorMessage;
        setUser(newUser);
      });
  };
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        let newUser = {
          isSignIn: false,
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          error: "",
        };
        setUser(newUser);
        history.push("/");
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const handleSubmit = (e) => {
    if (isMember) {
      console.log("Login Clicked");
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          let newUser = { ...user };
          newUser.isSignIn = true;
          newUser.error = "";
          setUser(newUser);
          history.replace(from);
        })
        .catch(function (error) {
          var errorMessage = error.message;
          let newUser = { ...user };
          newUser.error = errorMessage;
          setUser(newUser);
          // ...
        });
    }
    if (!isMember) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          let newUser = { ...user };
          newUser.error = "";
          newUser.isSignIn = true;
          setUser(newUser);
          setIsMember(true);
        })
        .catch(function (error) {
          const errorMessage = error.message;
          let newUser = { ...user };
          newUser.error = errorMessage;
          setUser(newUser);
          // ...
        });
    }
    e.preventDefault();
  };
  const handleBlur = (e) => {
    let isFormValid;
    if (e.target.name === "firstname") {
      isFormValid = true;
    }
    if (e.target.name === "lastname") {
      isFormValid = true;
    }
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);

      if (!isFormValid) {
        let newUser = { ...user };
        newUser.error = "Email is not Valid";
        setUser(newUser);
      }
    }
    if (e.target.name === "password1") {
      let isPasswordValid = e.target.value.length >= 8;
      if (isPasswordValid) {
        setPassword(e.target.value);
      }
      if (!isPasswordValid) {
        let newUser = { ...user };
        newUser.error = "Password length have to be minimum 8 character";
        setUser(newUser);
      }
    }
    if (e.target.name === "password") {
      if (isMember) {
        isFormValid = true;
      } else {
        isFormValid = e.target.value === password;
        if (!isFormValid) {
          let newUser = { ...user };
          newUser.error = "Password dosen't match";
          setUser(newUser);
        }
      }
    }
    if (isFormValid) {
      let newUser = { ...user };
      newUser.error = "";
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  };
  return (
    <section className="pt-100">
      <Row className="justify-content-center">
        <Col md={4}>
          <Alert variant="light">{user.error}</Alert>
          {user.isSignIn ? (
            <React.Fragment>
              <h1>Welcome</h1>
              <h3>{user.firstname}</h3>
              <h3>{user.email}</h3>
              <Button variant="warning" onClick={handleSignOut}>
                Sign Out
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="login-form">
                <h2>{formatTitle()}</h2>
                <Form>
                  {!isMember && (
                    <React.Fragment>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="firstname"
                          placeholder="Firstname"
                          required
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="lastname"
                          placeholder="Lastname"
                          required
                          onBlur={handleBlur}
                        />
                      </Form.Group>
                    </React.Fragment>
                  )}

                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="email"
                      name="email"
                      required
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  {!isMember && (
                    <Form.Group>
                      <Form.Control
                        type="password"
                        placeholder="Enter your Password"
                        name="password1"
                        required
                        onBlur={handleBlur}
                      />
                    </Form.Group>
                  )}

                  <Form.Group>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your Password"
                      name="password"
                      required
                      onBlur={handleBlur}
                    />
                  </Form.Group>

                  <Button type="submit" onClick={handleSubmit}>
                    {formatButton()}
                  </Button>
                  {formatToggleText()}
                </Form>
              </div>
              <div className="auth-box">
                <Button className="fb-btn" onClick={handleFacebookAuth}>
                  Continue with Facebook
                </Button>
                <Button className="google-btn" onClick={handleGoogleAuth}>
                  Continue with Google
                </Button>
              </div>
            </React.Fragment>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default Login;
