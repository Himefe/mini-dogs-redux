import React from "react";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/login/fetchLogin";
import Error from "../../helper/error";
import { useNavigate } from "react-router-dom";

const Login = function () {
  const navigate = useNavigate();

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const dispatcherLogin = async () => {
      const responseLogin = await dispatch(login({ username, password }));

      if (responseLogin && typeof responseLogin.payload === "object") {
        navigate("/");
      }
    };
    dispatcherLogin();
  };

  return (
    <section className={`${styles.sectionForm} lefToRight`}>
      <div className={styles.container}>
        <form name="login">
          <div className={styles.ContentFormArea}>
            <div className={styles.formSeparator}>
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                placeholder="Ex: User225"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div className={styles.formSeparator}>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                placeholder="Ex: *********"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
          </div>
          <div className={styles.buttonArea}>
            <button type="submit" onClick={handleSubmit}>
              Entrar
            </button>
          </div>
          {state.reducerLogin.token.error ? (
            <Error erro={state.reducerLogin.token.error} />
          ) : null}
        </form>
      </div>
    </section>
  );
};

export default Login;
