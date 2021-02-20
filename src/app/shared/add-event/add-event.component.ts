import { Component, OnInit } from '@angular/core';
import { NgForm, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddEventComponent>) { }

  ngOnInit(): void {
  }



  add(f:NgForm) {
    console.log(f.value)
    /*
    '2021-02-13T08:00:00.000Z'
    2021-2-9T22:59:0.000Z
    date: {year: 2021, month: 2, day: 18}
description: "aaaaaaaaa"
end: {hour: 22, minute: 59, second: 0}
start: {hour: 22, minute: 59, second: 0}
    */

    let date = ("0" + f.value.date.getDate()).slice(-2);

    let month = ("0" + (f.value.date.getMonth()+1 )).slice(-2);
    let year = f.value.date.getYear()+1900;

    const start=year + "-" + month + "-" + date + " " + f.value.start + ":00" ;
    const end=year + "-" + month + "-" + date + " " + f.value.end + ":00" ;
   this.dialogRef.close({ data: {start:start,end:end,description:f.value.description} });
  }
}
