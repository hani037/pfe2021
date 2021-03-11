export class event {
  id?: string;
  userId?: string;
  start:string;
  end:string;
  color:string;
  description:string;
  public static clone(src: event, dest : event):void {
    dest.id = src.id;
    dest.userId = src.userId;
    dest.start = src.start;
    dest.end = src.end;
    dest.color = src.color;
    dest.description = src.description;
  }
}
