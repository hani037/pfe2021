import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {CalendarProService} from "../service/calendarPro.service";
import {Vacation} from "../model/vacation";

@Component({
  selector: 'app-create-vacation',
  templateUrl: './create-vacation.component.html',
  styleUrls: ['./create-vacation.component.css']
})
export class CreateVacationComponent implements OnInit {
  is_loading:boolean= false;
  rangeDate: FormGroup;
  constructor(private dialogRef: MatDialogRef<CreateVacationComponent>,@Inject(MAT_DIALOG_DATA) public data: {start:Date,end:Date,id:string},private calendarProService:CalendarProService) { }

  ngOnInit(): void {
    this.rangeDate = new FormGroup({
      start: new FormControl(null, Validators.required),
      end: new FormControl(null , Validators.required)
    });
  }

  add() {
    this.is_loading = true;
    let vacation = new Vacation();
    let startDate = ("0" + this.rangeDate.value.start.getDate()).slice(-2);
    let startMonth = ("0" + (this.rangeDate.value.start.getMonth()+1 )).slice(-2);
    let startYear = this.rangeDate.value.start.getFullYear();
    let endDate = ("0" + this.rangeDate.value.end.getDate()).slice(-2);
    let endMonth = ("0" + (this.rangeDate.value.end.getMonth()+1 )).slice(-2);
    let endYear = this.rangeDate.value.end.getFullYear();
    vacation.start =startYear + "-" + startMonth + "-" + startDate;
    vacation.end =endYear + "-" + endMonth + "-" + endDate;
   this.calendarProService.createVacation(vacation,this.data.id).subscribe(data=>{
     this.dialogRef.close('deleted');
  })
  }
}
