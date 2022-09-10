import { User } from "../../../src/model/User";

export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN",
  }

export const userMock = new User(
    "user mock",
    "email@email.com",
    "1234678Aa*",
    UserRole.NORMAL
)
     