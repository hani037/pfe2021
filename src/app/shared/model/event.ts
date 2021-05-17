export class event {
  id?: string;
  userId?: string;
  start:string;
  end:string;
  date:string;
  recurrence:boolean;
  recurrenceType:string;
  color:string;
  description:string;
  image:string;
  calendarsId?:string[];
  contacts?:string[];
  tags?:string[];

}
