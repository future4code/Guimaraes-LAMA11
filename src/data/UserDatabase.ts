import { UserDTO } from "./../model/userTypes";
import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";
import { UserRepository } from "../business/UserRepository";

export class UserDatabase extends BaseDatabase implements UserRepository {
  private static TABLE_NAME = "NOME_TABELAS_USUÁRIOS";

  public createUser = async (user: UserDTO): Promise<void> => {
    try {
      await this.getConnection()
        .insert({
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password,
          role: user.role,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  };

  public async getUserByEmail(email: string): Promise<UserDTO> {
    try {
      const user: UserDTO[] = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });
      return user[0];
    } catch (error: any) {
      throw new CustomError(500, error.sqlMessage);
    }
  }
}
