import { FieldValidation } from "@/validation/protocols/field-validation";

import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from "@/validation/validators";

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  public required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));

    return this;
  }

  public email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));

    return this;
  }

  public min(length: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, length));

    return this;
  }

  public build(): FieldValidation[] {
    return this.validations;
  }
}
