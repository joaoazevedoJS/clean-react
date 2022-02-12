import {
  ValidationBuilder,
  ValidationComposite,
} from "@/validation/validators";

export const MakeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().build(),
  ]);
};
