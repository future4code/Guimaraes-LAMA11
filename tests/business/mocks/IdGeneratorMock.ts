import { IIdGenerator } from '../../../src/business/Ports';

export class IdGeneratorMock implements IIdGenerator{
    generateId = (()=> "meu id")   
    }
