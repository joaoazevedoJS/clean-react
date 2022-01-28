import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useCallback,
  useState,
} from "react";

import Styles from "./input-styles.module.scss";

type InputStringAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

export type InputOnChangeEvent = {
  fieldName: string;
  value: string;
  element: HTMLInputElement;
};

type Props = InputStringAttributes & {
  errorMessage?: string;
  value?: string;
  name: string;
  onChange?: (props: InputOnChangeEvent) => void;
  ["data-testid"]?: string;
};

const Input: FC<Props> = ({ errorMessage, onChange, name, value, ...rest }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleUpdateInput = useCallback(
    (element: ChangeEvent<HTMLInputElement>) => {
      setInputValue(element.target.value);

      if (onChange) {
        onChange({
          fieldName: name,
          value: element.target.value,
          element: element.target,
        });
      }
    },
    [onChange, name]
  );

  return (
    <div className={Styles.inputWrap}>
      <input
        {...rest}
        value={inputValue}
        onChange={handleUpdateInput}
        className={errorMessage ? Styles.statusError : ""}
      />

      <div
        role="status"
        title={errorMessage || "ok"}
        aria-label="status input"
        className={`${Styles.status} ${errorMessage ? Styles.statusError : ""}`}
        {...(rest["data-testid"]
          ? { "data-testid": `${rest["data-testid"]}-status` }
          : {})}
      />
    </div>
  );
};

export default Input;
