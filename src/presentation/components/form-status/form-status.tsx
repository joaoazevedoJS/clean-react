import React, { FC } from "react";

import { Spinner } from "@/presentation/components";

import { useFormContext } from "@/presentation/contexts/form/form-context";

import Styles from "./form-status-styles.module.scss";

const FormStatus: FC = () => {
  const { isLoading, errorMessage } = useFormContext();

  return (
    <div
      aria-label="error wrap"
      role="contentinfo"
      className={Styles.errorWrap}
      aria-busy={isLoading}
    >
      {isLoading && <Spinner className={Styles.spinner} />}

      {errorMessage && (
        <span role="alert" aria-label="error message" className={Styles.error}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
