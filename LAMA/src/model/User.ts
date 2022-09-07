import {
  InvalidEmail,
  InvalidPassword,
  InvalidRole,
} from "../error/CustomError";
import { UserRole } from "./userTypes";

export class User {
  private _emailRegeX: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  private _passwordRegex: RegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,20}$/;

  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole = UserRole.NORMAL
  ) {
    this.setEmail(email);
    this.setPassword(password);
    this.setRole(role);
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getRole() {
    return this.role;
  }

  setName(name: string) {
    this.name = name;
  }

  setEmail(email: string) {
    const result = this._emailRegeX.test(email);
    if (!result) throw new InvalidEmail();
  }

  setPassword(password: string) {
    const result = this._passwordRegex.test(password);
    if (!result) throw new InvalidPassword();
  }

  setRole(role: UserRole) {
    this.role = role;
  }

  static stringToUserRole(roleInput: string): UserRole {
    switch (roleInput) {
      case "NORMAL":
        return UserRole.NORMAL;
      case "ADMIN":
        return UserRole.ADMIN;
      default:
        throw new InvalidRole();
    }
  }

  static toUserModel(user: any): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      User.stringToUserRole(user.role)
    );
  }
}
