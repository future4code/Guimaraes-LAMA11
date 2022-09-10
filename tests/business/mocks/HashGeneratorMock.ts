import { IHashManager } from "../../../src/business/Ports";

export class HashManagerMock implements IHashManager{
    async generateHash(password: string): Promise<string> {
        return "hashPassword"
    }
    async compareHash(password: string, hash: string): Promise<boolean> {
        return password === hash
    }
   
}