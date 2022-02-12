import { FieldValidation } from "@/validation/protocols/field-validation";

import { RequiredFieldValidation } from "@/validation/validators";

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

  public build(): FieldValidation[] {
    return this.validations;
  }
}
