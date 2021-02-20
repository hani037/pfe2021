export class User {
  id: String;
  userName?: String;
  password?: String;
  public static clone(src: User, dest : User):void {
    dest.id = src.id;
    dest.userName = src.userName;
  }
}
