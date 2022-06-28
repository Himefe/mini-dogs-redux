import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/formLogin/Login";
import { autoLogin } from "./redux/login/fetchLogin";
import Content from "./pages/content/Content";
import Header from "./Components/Header/Header";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  React.useEffect(() => {
    const dispatcherAutoLogin = async () => {
      const responseAutoLogin = await dispatch(autoLogin());
      if (typeof responseAutoLogin?.payload === "object") {
        navigate("./");
      } else {
        navigate("./login");
      }
    };
    dispatcherAutoLogin();
  }, [state.user]);

  return (
    <main>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
