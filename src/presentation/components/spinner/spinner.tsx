import React, { FC, HTMLAttributes } from "react";

import Styles from "./spinner-styles.module.scss";

type Props = HTMLAttributes<HTMLElement>;

const Spinner: FC<Props> = ({ className, ...rest }) => {
  return (
    <div
      {...rest}
      role="status"
      title="loading..."
      aria-label="spinner loading"
      className={[Styles.spinner, className].join(" ")}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
