import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }
  public getDate(date:Date){
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth()+1 )).slice(-2);
    let year = date.getFullYear();
    return year + "-" + month + "-" + day;
  }
  public getHours(date:Date){
  return ("0"+date.getHours()).slice(-2)+':'+ ("0"+date.getMinutes()).slice(-2);
  }
  public getDateAndHours(date:Date){
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth()+1 )).slice(-2);
    let year = date.getFullYear();
    return year + "-" + month + "-" + day +" " +("0"+date.getHours()).slice(-2)+':'+ ("0"+date.getMinutes()).slice(-2);
  }
}
