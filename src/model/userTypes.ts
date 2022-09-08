
export enum UserRole {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN",
  }
  
export interface UserInputDTO{
    email: string;
    password: string;
    name: string;
    role: UserRole;
}

export interface LoginInputDTO{
    email: string;
    password: string;
    token: string
}

export interface UserDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole
  }
  
  export interface AuthenticationData {
    id: string;
    role: UserRole;
  };
  