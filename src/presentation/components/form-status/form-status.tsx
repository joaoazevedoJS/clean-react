import React, { FC } from "react";

import { Spinner } from "@/presentation/components";

import Styles from "./form-status-styles.module.scss";

const FormStatus: FC = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />

      <span className={Styles.error}>Erro</span>
    </div>
  );
};

export default FormStatus;
