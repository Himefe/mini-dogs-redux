import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggout } from "../../redux/login/fetchLogin";

import styles from "./header.module.css";

function Header() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const logado = !!state.reducerLogin.user.data;
  const logando =
    state.reducerLogin.user.loading || state.reducerLogin.token.loading;

  return (
    <header className={styles.header}>
      <h1>Mini Dogs</h1>
      <span
        className={`${logado ? styles.logado : ""} ${
          logando ? styles.loading : ""
        }`}
        onClick={() => {
          dispatch(userLoggout());
          // alert("A");
        }}
      ></span>
    </header>
  );
}

export default Header;
