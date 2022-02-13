import "reflect-metadata";

import {
  ValidationComposite,
  ValidationBuilder,
} from "@/validation/validators";

import { MakeLoginValidation } from "./login-validation-factory";

describe("LoginValidationFactory", () => {
  test("Should make ValidationComposite with correct validations", () => {
    const composite = MakeLoginValidation();

    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().build(),
      ])
    );
  });
});
