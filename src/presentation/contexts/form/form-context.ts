import { createContext, useContext } from "react";

export type FormContextProps = {
  isLoading: boolean;
  errorMessage: string;
};

export type FormContextPropsMocked = {
  [key in keyof FormContextProps]?: FormContextProps[key];
};

export const FormContext = createContext<FormContextProps>(
  {} as FormContextProps
);

export function useFormContext(): FormContextProps {
  const context = useContext(FormContext);

  return context;
}
