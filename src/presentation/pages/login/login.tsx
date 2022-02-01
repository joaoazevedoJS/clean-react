import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

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

import { Validation } from "@/presentation/protocols/validation";

import Styles from "./login-styles.module.scss";
import { InputOnChangeEvent } from "@/presentation/components/input/input";

type Props = {
  validation: Validation;
};

type ErrorStatusProps = {
  email: string;
  password: string;
};

const Login: FC<Props> = ({ validation }) => {
  const [state, setState] = useState<FormContextProps>({
    isLoading: false,
    errorMessage: "",
    email: "",
    password: "",
  });

  const [errorStatusForm, setErrorStatusForm] = useState<ErrorStatusProps>({
    email: validation.validate({ fieldName: "email", fieldValue: "" }),
    password: validation.validate({ fieldName: "password", fieldValue: "" }),
  });

  const hasErrorInForm = useMemo(() => {
    return Object.values(errorStatusForm).reduce((acc, value) => {
      if (!value) return acc;

      return acc || String(value).trim().length > 0;
    }, false);
  }, [errorStatusForm]);

  const handleUpdateInput = useCallback(
    ({ fieldName, value }: InputOnChangeEvent) => {
      setState((oldState) => ({ ...oldState, [fieldName]: value }));

      setErrorStatusForm((oldState) => ({
        ...oldState,
        [fieldName]: validation.validate({ fieldName, fieldValue: value }),
      }));
    },
    [validation]
  );

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
            onChange={handleUpdateInput}
            data-testid="email"
          />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            errorMessage={errorStatusForm.password}
            onChange={handleUpdateInput}
            data-testid="password"
          />

          <button
            disabled={hasErrorInForm}
            className={Styles.submit}
            type="submit"
          >
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
