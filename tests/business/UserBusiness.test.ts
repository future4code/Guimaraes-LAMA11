import { UserBusiness } from "../../src/business/UserBusiness";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import { HashManagerMock } from "./mocks/HashGeneratorMock";
import { IdGeneratorMock } from "./mocks/IdGeneratorMock";
import { UserDatabaseMock } from "./mocks/UserDatabaseMock";

const userDBMock = new UserDatabaseMock();
const idGeneratorMock = new IdGeneratorMock();
const authenticatorMock = new AuthenticatorMock();
const hashManagerMock = new HashManagerMock();

const userBusinessTest = new UserBusiness(
  userDBMock,
  hashManagerMock,
  authenticatorMock,
  idGeneratorMock
);

enum UserRole {
  NORMAL = "NORMAL",
  ADMIN = "NENHUM",
}

describe("1. Testando Signup UserBusiness", () => {
  test(" Caso de erro: email inválido", async () => {
    expect.assertions(3);
    try {
      const input = {
        name: "user mock",
        email: "email@emailcom",
        password: "1234678Aa*",
        role: UserRole.NORMAL,
      };

      await userBusinessTest.signup(input);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.status).toBe(405);
      expect(error.message).toBe(" Invalid Email, please verify and try again");
    }
  });

  test("2. Caso de erro: PASSWORD inválido", async () => {
    expect.assertions(3);
    try {
      const input = {
        name: "user mock",
        email: "email@email.com",
        password: "4678Aa*",
        role: UserRole.ADMIN,
      };

      await userBusinessTest.signup(input);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.status).toBe(405);
      expect(error.message).toBe(
        " Invalid Password format, please verify and try again"
      );
    }
  });

  test("3.caso de sucesso: token gerado", async () => {
    expect.assertions(2);
    try {
      const input = {
        name: "user mock",
        email: "email@email.com",
        password: "1234678Aa*",
        role: UserRole.NORMAL,
      };

      const result = await userBusinessTest.signup(input);
      expect(result).toBeDefined();
      expect(result).toEqual({
        id: "id teste mock",
        role: UserRole.NORMAL,
      });
    } catch (error: any) {}
  });
});

describe("Teste de Login", () => {
  test("1. caso de token inválido", async () => {
    expect.assertions(3);

    try {
      const input = {
        email: "email@email.com",
        password: "1234678Aaa*",
        token: "token teste",
      };

      await userBusinessTest.login(input);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.status).toBe(401);
      expect(error.message).toBe(" Invalid Token, please verify and try again");
    }
  });

  test("2. caso de usuário não encontrado", async () => {
    expect.assertions(3);

    try {
      const input = {
        email: "emailerrado@email.com",
        password: "1234678Aaa*",
        token: "token teste mock",
      };
      const user = userDBMock.getUserByEmail(input.email)

      await userBusinessTest.login(input);


    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.status).toBe(404);
      expect(error.message).toBe("Not Found, please verify Email User Sent");
    }
  });






});
