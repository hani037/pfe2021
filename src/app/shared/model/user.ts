export class User {
  id: string;
  userName?: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  client?: boolean;
  enabled?: boolean;
  public static clone(src: User, dest : User):void {
    dest.id = src.id;
    dest.userName = src.userName;
    dest.password = src.password;
    dest.email = src.email;
    dest.firstName = src.firstName;
    dest.lastName = src.lastName;
    dest.client = src.client;
    dest.enabled = src.enabled;
  }
}

