import { FieldValidation } from "@/validation/protocols/field-validation";

import { InvalidFieldError } from "@/validation/errors";

export class EmailValidation implements FieldValidation {
  constructor(public readonly field: string) {}

  validate(value: string): Error {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (value.trim().length === 0) return null;

    return regex.test(value) ? null : new InvalidFieldError();
  }
}
