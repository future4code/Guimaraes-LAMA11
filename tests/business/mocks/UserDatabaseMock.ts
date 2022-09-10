import { UserRepository } from "../../../src/business/UserRepository";
import { User } from "../../../src/model/User";
import { UserDTO, UserRole } from "../../../src/model/userTypes";

export class UserDatabaseMock implements UserRepository {
  async createUser(user: UserDTO): Promise<void> {
  }
  async getUserByEmail(email: string): Promise<UserDTO> {
    return {
      id: "meu id",
      name: "user mock",
      email: "email@mock.com",
      password: "123456Aa*",
      role: UserRole.NORMAL,
    };
  }
}
