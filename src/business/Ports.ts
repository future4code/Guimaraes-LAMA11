import { AuthenticationData } from "../model/userTypes";

export interface IHashManager{
     generateHash(password: string): Promise<string>
     compareHash(password: string, hash: string): Promise<boolean>
};

export interface IIdGenerator{
    generateId():string

};

export interface IAuthenticator{
    generateToken(input: AuthenticationData, ): string;
    getTokenData(token: string): AuthenticationData 

};