
export class Rdv {
  start:string;
  end:string
}
export class section {
  description:string;
  rdv:Rdv[];
  img:string;
}

export class Client {
  id:number;
  userName:string;
  lat:number;
  lng:number;
  sections:section[]
}
