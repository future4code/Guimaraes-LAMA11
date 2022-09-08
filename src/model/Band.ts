import { UserRole } from "./userTypes";

export class Band {
    constructor(
      private name: string,
      private music_genre: string,
      private responsible: string,
      private role: UserRole = UserRole.ADMIN
    ) {}
    getName() {
      return this.name;
    }
    getMusicGenre() {
      return this.music_genre;
    }
    getResponsible() {
      return this.responsible
    }
    setName(name: string) {
      this.name = name;
    }
    getRole() {
      return this.role;
    }
  }
  