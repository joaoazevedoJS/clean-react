import React, { FC, InputHTMLAttributes } from "react";

import Styles from "./input-styles.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = (props) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...props} />

      <span className={Styles.status} />
    </div>
  );
};

export default Input;
