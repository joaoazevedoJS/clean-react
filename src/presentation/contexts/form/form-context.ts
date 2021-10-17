import { createContext, useContext } from "react";

export type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

export const FormContext = createContext<StateProps>({} as StateProps);

export function useFormContext(): StateProps {
  const context = useContext(FormContext);

  return context;
}
