import React, { FC } from "react";

import Spinner from "@/presentation/components/spinner/spinner";
import Logo from "@/presentation/components/logo/logo";

import Styles from "./login-styles.module.scss";

const Login: FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />

        <h1>Enquestes Para Programadores</h1>
      </header>

      <form className={Styles.form}>
        <h2>Login</h2>

        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />

          <span className={Styles.status} />
        </div>

        <div className={Styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <span className={Styles.status} />
        </div>

        <button className={Styles.submit} type="submit">
          Entrar
        </button>

        <span className={Styles.link}>Criar conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />

          <span className={Styles.error}>Erro</span>
        </div>
      </form>

      <footer className={Styles.footer}>C</footer>
    </div>
  );
};

export default Login;
