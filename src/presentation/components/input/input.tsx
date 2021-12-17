import React, { FC, InputHTMLAttributes } from "react";

import Styles from "./input-styles.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
};

const Input: FC<Props> = ({ errorMessage, ...rest }) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...rest} />

      <div
        role="status"
        title={errorMessage || "ok"}
        aria-label="input status"
        className={`${Styles.status} ${errorMessage ? Styles.statusError : ""}`}
      />
    </div>
  );
};

export default Input;
