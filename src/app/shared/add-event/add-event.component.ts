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


    let date = ("0" + f.value.date.getDate()).slice(-2);

    let month = ("0" + (f.value.date.getMonth()+1 )).slice(-2);
    let year = f.value.date.getYear()+1900;

    const start=year + "-" + month + "-" + date + " " + f.value.start + ":00" ;
    const end=year + "-" + month + "-" + date + " " + f.value.end + ":00" ;
   this.dialogRef.close({ data: {start:start,end:end,description:f.value.description} });
  }
}
