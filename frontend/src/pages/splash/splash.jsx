import React from "react";
import "./splash.scss";
import { Spinner } from "react-bootstrap";

function Splash() {
  return (
    <div className="splash-container">
      <Spinner
        animation="border"
        role="status"
        style={{ color: "#fff", fontSize: "300px" }}
      />
    </div>
  );
}

export default Splash;
