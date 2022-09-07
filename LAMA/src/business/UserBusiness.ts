import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { AuthenticationData, LoginInputDTO, UserDTO, UserInputDTO } from "../model/userTypes";
import { UserRepository } from "./UserRepository";
import { MailDataBase } from "../services/MailTransporter";
import { User } from "../model/User";
import { validateRole } from "../controller/UserControllerSerializer";
import { InvalidPassword, InvalidToken, UserNotFoundEmail } from "../error/CustomError";

export class UserBusiness {
    constructor(
        private userDB: UserRepository,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private emailConfirmation: MailDataBase
    ){}

    public signUp = async (input: UserInputDTO): Promise<string> => {
        const { name, email, password, role } = input;
        
        const user = new User(name, email, password, role);

        const id: string = this.idGenerator.generateId();

        const hashPassword = await this.hashManager.generateHash(password);


        const newUser: UserDTO = {
            id,
            name: user.getName(),
            email: user.getEmail(),
            password: hashPassword,
            role: user.getRole(),
          };


        await this.userDB.createUser(newUser);

        const accessToken = this.authenticator.generateToken({ id, role: role });

        return accessToken;
    }
    
    public login = async (input: LoginInputDTO): Promise<string> => {
        const { email, password, token } = input;
    
        const authentication = this.authenticator.getTokenData(token);
    
        validateRole(authentication.role);
    
        const user = await this.userDB.getUserByEmail(email);
        if (!user) {
          throw new UserNotFoundEmail();
        }
    
        if(authentication.id !== user.id){
          throw new InvalidToken()
        }
        const hashCompare = await this.hashManager.compareHash(
          password,
          user.password
        );
    
        if (!hashCompare) {
          throw new InvalidPassword();
        }
    
        const payload: AuthenticationData = {
          id: user.id,
          role: user.role,
        };
    
        const newToken = this.authenticator.generateToken(payload);
        return newToken;
      };

}