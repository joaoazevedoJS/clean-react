import React, { FC, memo } from "react";

import Styles from "./footer-styles.module.scss";

const Footer: FC = () => {
  return <footer className={Styles.footer}> </footer>;
};

// memo evitar que um componente estatico seja renderizado mais de uma vez
export default memo(Footer);
