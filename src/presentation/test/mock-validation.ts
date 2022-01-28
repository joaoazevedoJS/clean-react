import { ValidateProps, Validation } from "@/presentation/protocols/validation";

export class ValidationSpy implements Validation {
  public fieldName?: string;

  public fieldValue?: string;

  public errorMessage?: string;

  validate({ fieldName, fieldValue }: ValidateProps): string | undefined {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;

    return this.errorMessage;
  }
}
