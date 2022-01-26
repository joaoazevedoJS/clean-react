import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";

import Styles from "./input-styles.module.scss";

type InputStringAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

type Props = InputStringAttributes & {
  errorMessage?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const Input: FC<Props> = ({ errorMessage, onChange, value, ...rest }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleUpdateInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  useEffect(() => {
    if (onChange) onChange(inputValue || "");
  }, [onChange, inputValue]);

  return (
    <div className={Styles.inputWrap}>
      <input
        {...rest}
        value={inputValue}
        onChange={handleUpdateInput}
        className={errorMessage ? Styles.statusError : ""}
        aria-label="textbox input"
      />

      <div
        role="status"
        title={errorMessage ? String(errorMessage) : "ok"}
        aria-label="status input"
        className={`${Styles.status} ${errorMessage ? Styles.statusError : ""}`}
      />
    </div>
  );
};

export default Input;
