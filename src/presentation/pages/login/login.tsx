import React, { FC, useState } from "react";

import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from "@/presentation/components";

import {
  FormContext,
  FormContextProps,
} from "@/presentation/contexts/form/form-context";

import Styles from "./login-styles.module.scss";

const Login: FC = () => {
  const [state] = useState<FormContextProps>({
    isLoading: false,
    errorMessage: "",
  });

  const [errorStatusForm] = useState({
    email: "Campo obrigatório",
    password: "Campo obrigatório",
  });

  return (
    <div className={Styles.login}>
      <FormContext.Provider value={state}>
        <LoginHeader />

        <form className={Styles.form}>
          <h2>Login</h2>

          <Input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            errorMessage={errorStatusForm.email}
          />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            errorMessage={errorStatusForm.password}
            onChange={(e) => console.log(e)}
          />

          <button disabled className={Styles.submit} type="submit">
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
