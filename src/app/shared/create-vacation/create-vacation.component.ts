import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {CalendarProService} from "../service/calendarPro.service";
import {Vacation} from "../model/vacation";
import {DateService} from "../service/date.service";

@Component({
  selector: 'app-create-vacation',
  templateUrl: './create-vacation.component.html',
  styleUrls: ['./create-vacation.component.css']
})
export class CreateVacationComponent implements OnInit {
  is_loading:boolean= false;
  rangeDate: FormGroup;
  constructor(private dialogRef: MatDialogRef<CreateVacationComponent>,@Inject(MAT_DIALOG_DATA) public data: {start:Date,end:Date,id:string},
              private calendarProService:CalendarProService,private dateService:DateService) { }

  ngOnInit(): void {
    this.rangeDate = new FormGroup({
      start: new FormControl(null, Validators.required),
      end: new FormControl(null , Validators.required)
    });
  }

  add() {
    this.is_loading = true;
    let vacation = new Vacation();
    vacation.start =this.dateService.getDate(this.rangeDate.value.start) ;
    vacation.end =this.dateService.getDate(this.rangeDate.value.end) ;
   this.calendarProService.createVacation(vacation,this.data.id).subscribe(data=>{
     this.dialogRef.close('created');
  })
  }
}
