import * as jwt from "jsonwebtoken";
import { InvalidToken } from "../error/CustomError";
import { UserRole } from "../model/userTypes";

interface AuthenticationData {
  id: string;
  role: UserRole;
}

export class Authenticator {
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  public getTokenData(token: string): AuthenticationData {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
      const result = {
        id: payload.id,
        role: payload.role,
      } as AuthenticationData;
      return result;
    } catch (error: any) {
      throw new InvalidToken();
    }
  }
}

