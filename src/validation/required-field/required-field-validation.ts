import { FieldValidation } from "@/validation/protocols/field-validation";

import { RequiredFieldError } from "@/validation/errors";

export class RequiredFieldValidation implements FieldValidation {
  constructor(public readonly field: string) {}

  validate(value: string): Error {
    return new RequiredFieldError();
  }
}
