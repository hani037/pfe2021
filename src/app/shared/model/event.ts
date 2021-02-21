export class event {
  id: String;
  userId: String;
  start:string;
  end:string
  description:string;
  public static clone(src: event, dest : event):void {
    dest.id = src.id;
    dest.userId = src.userId;
    dest.start = src.start;
    dest.end = src.end;
    dest.description = src.description;
  }
}
