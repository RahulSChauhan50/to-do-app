import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Login from "./pages/login/login";
import Todo from "./pages/todo/todo";
import Splash from "./pages/splash/splash";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  if (loginLoading) {
    return (
      <div className="app-container">
        <Splash />
      </div>
    );
  }

  return (
    <div className="app-container">
      {loggedIn ? (
        <Todo setLoggedIn={setLoggedIn} />
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
