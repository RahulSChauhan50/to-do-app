import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Login from "./pages/login/login";
import Todo from "./pages/todo/todo";
import Splash from "./pages/splash/splash";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./global/key";
import axios from "axios";
import { URLS } from "./global/urls";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginLoading, setLoginLoading] = useState(true);

  const checkLoggedIn = () => {
    setLoginLoading(true);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setLoggedIn(false);
      setLoginLoading(false);
      return;
    }

    axios
      .post(URLS.refresh, {
        refreshToken,
      })
      .then((res) => {
        const accessToken = res.data.data.accessToken;
        sessionStorage.setItem(ACCESS_TOKEN, accessToken);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log("error in login", err);
        setLoggedIn(false);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

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
