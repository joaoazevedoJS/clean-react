import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/mock";

export class AuthenticationSpy implements Authentication {
  private account = mockAccountModel();

  public params: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;

    return Promise.resolve(this.account);
  }
}
