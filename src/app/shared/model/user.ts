export class User {
  id: String;
  userName?: String;
  password?: String;
  email?: String;
  firstName?: String;
  lastName?: String;
  client?: boolean;
  public static clone(src: User, dest : User):void {
    dest.id = src.id;
    dest.userName = src.userName;
    dest.password = src.password;
    dest.email = src.email;
    dest.firstName = src.firstName;
    dest.lastName = src.lastName;
    dest.client = src.client;
  }
}

