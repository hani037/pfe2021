import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CalendarProService} from "../service/calendarPro.service";
import {SeanceEs} from "../model/SeanceEs";
import {DateService} from "../service/date.service";

@Component({
  selector: 'app-add-validity',
  templateUrl: './add-validity.component.html',
  styleUrls: ['./add-validity.component.css']
})
export class AddValidityComponent implements OnInit {
  is_loading:boolean=false;
  form: FormGroup;
  private max: Date;
  private min: Date;
  private date: string;
  constructor(private dialogRef: MatDialogRef<AddValidityComponent>,@Inject(MAT_DIALOG_DATA) public data: {start:Date,end:Date,id:string},private calendarProService:CalendarProService,private dateService:DateService) { }

  ngOnInit(): void {
    this.max = new Date(this.data.start.getFullYear(),this.data.start.getMonth(),this.data.start.getDate()+90);
    this.min = this.data.end;
    this.date = this.dateService.getDate(this.data.end);
    this.form = new FormGroup({
      date: new FormControl(null, Validators.required),
    });
  }
  add() {
    this.is_loading = true;
    console.log(this.form.value.date)
    this.calendarProService.addValidity(this.form.value.date,this.data.id).subscribe(data=>{
      this.dialogRef.close('created');
    })
  }

}
