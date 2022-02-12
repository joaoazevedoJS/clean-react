import "reflect-metadata";

import { ValidateProps, Validation } from "@/presentation/protocols/validation";

import { FieldValidation } from "@/validation/protocols/field-validation";

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  validate({ fieldName, fieldValue }: ValidateProps): string {
    const validators = this.validators.filter(
      (validator) => validator.field === fieldName
    );

    for (const validator of validators) {
      const error = validator.validate(fieldValue);

      if (error) return error.message;
    }

    return null;
  }
}