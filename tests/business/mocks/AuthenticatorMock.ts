import { UserRole } from "./../../../src/model/userTypes";
import { IAuthenticator } from "../../../src/business/Ports";
import { AuthenticationData } from "../../../src/model/userTypes";

export class AuthenticatorMock implements IAuthenticator {
  generateToken(input: AuthenticationData): string {
    return "token teste mock";
  }
  getTokenData(token: string): AuthenticationData {
    return {
      id: "id teste mock",
      role: UserRole.NORMAL
    };
  }
}
