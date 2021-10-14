import React, { FC, memo } from "react";

import { Logo } from "@/presentation/components";

import Styles from "./login-header-styles.module.scss";

const LoginHeader: FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />

      <h1>Enquestes Para Programadores</h1>
    </header>
  );
};

// memo evitar que um componente estatico seja renderizado mais de uma vez
export default memo(LoginHeader);
