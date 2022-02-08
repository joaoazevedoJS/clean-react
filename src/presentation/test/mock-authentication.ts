import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/mock";

export class AuthenticationSpy implements Authentication {
  private account = mockAccountModel();

  public params: AuthenticationParams;

  public callsCount = 0;

  public async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;

    this.callsCount += 1;

    return Promise.resolve(this.account);
  }
}
