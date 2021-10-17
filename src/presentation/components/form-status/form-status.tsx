import React, { FC } from "react";

import { Spinner } from "@/presentation/components";

import { useFormContext } from "@/presentation/contexts/form/form-context";

import Styles from "./form-status-styles.module.scss";

const FormStatus: FC = () => {
  const { isLoading, errorMessage } = useFormContext();

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}

      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;
