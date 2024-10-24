import React from "react";
import { Form, Button } from "react-bootstrap";
import "./login.scss";

function Login({ setLoggedIn }) {
  const handleLogin = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const dataObj = Object.fromEntries(formdata);
    console.log(dataObj);
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
