import React from "react";
import { Form, Button } from "react-bootstrap";
import "./login.scss";
import axios from "axios";
import { URLS } from "../../global/urls";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../global/key";

function Login({ setLoggedIn }) {
  const handleLogin = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const dataObj = Object.fromEntries(formdata);
    axios
      .post(URLS.login, {
        email: dataObj.email,
        password: dataObj.password,
      })
      .then((res) => {
        console.log("response login", res.data);
        localStorage.setItem(REFRESH_TOKEN, res.data.data.refreshToken);
        sessionStorage.setItem(ACCESS_TOKEN, res.data.data.accessToken);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log("error in login", err);
      });
  };

  return (
    <div className="login-container">
      <div>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              name="password"
            />
          </Form.Group>
          <Button type="submit">Login/Register</Button>
        </Form>
        <div>
          If the Email exists then you have to enter the previous password else
          it will create a new user!
        </div>
      </div>
    </div>
  );
}

export default Login;
