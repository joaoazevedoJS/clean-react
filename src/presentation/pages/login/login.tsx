import React, { FC, FormEvent, useCallback, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

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
import { InputOnChangeEvent } from "@/presentation/components/input/input";

import { Authentication } from "@/domain/usecases";

import Styles from "./login-styles.module.scss";

type Props = {
  validation: Validation;
  authentication: Authentication;
};

type ErrorStatusProps = {
  email: string;
  password: string;
};

const Login: FC<Props> = ({ validation, authentication }) => {
  const navigate = useNavigate();

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

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      if (hasErrorInForm || state.isLoading) return;

      try {
        setState((oldState) => ({ ...oldState, isLoading: true }));

        const account = await authentication.auth({
          email: state.email,
          password: state.password,
        });

        localStorage.setItem("accessToken", account.accessToken);

        navigate("/");
      } catch (error) {
        const err = error as Error;

        setState((oldState) => ({
          ...oldState,
          isLoading: false,
          errorMessage: err.message,
        }));
      }
    },
    [
      authentication,
      hasErrorInForm,
      navigate,
      state.email,
      state.isLoading,
      state.password,
    ]
  );

  return (
    <div className={Styles.login}>
      <FormContext.Provider value={state}>
        <LoginHeader />

        <form
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
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

          <Link
            to="/signup"
            className={Styles.link}
            aria-label="registe account"
          >
            Criar conta
          </Link>

          <FormStatus />
        </form>

        <Footer />
      </FormContext.Provider>
    </div>
  );
};

export default Login;
