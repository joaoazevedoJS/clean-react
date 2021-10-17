import React, { FC, useState } from "react";

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from "@/presentation/components";

import {
  FormContext,
  StateProps,
} from "@/presentation/contexts/form/form-context";

import Styles from "./login-styles.module.scss";

const Login: FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: "",
  });

  return (
    <div className={Styles.login}>
      <FormContext.Provider value={state}>
        <LoginHeader />

        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button className={Styles.submit} type="submit">
            Entrar
          </button>

          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>

        <Footer />
      </FormContext.Provider>
    </div>
  );
};

export default Login;
