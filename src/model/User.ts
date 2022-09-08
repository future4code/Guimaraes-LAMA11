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
    private name: string,
    private email: string,
    private password: string,
    private role: UserRole,
  ) {
    this.setEmail(email);
    this.setPassword(password);
    this.setRole(role);
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

  public setRole(role: UserRole) {
    if (role.toUpperCase() === UserRole.NORMAL) {
      this.role = UserRole.NORMAL;
    }
    if (role.toUpperCase() === UserRole.ADMIN) {
      this.role = UserRole.ADMIN;
    } else if (
      role.toUpperCase() !== UserRole.NORMAL &&
      role.toUpperCase() !== UserRole.ADMIN
    ) {
      throw new InvalidRole();
    }
  }
}
