import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CalendarProService} from "../service/calendarPro.service";
import {SeanceEs} from "../model/SeanceEs";
import {DateService} from "../service/date.service";

@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.css']
})
export class AddSeanceComponent implements OnInit {
  form: FormGroup;
  is_loading:boolean=false;
  constructor(private dialogRef: MatDialogRef<AddSeanceComponent>,@Inject(MAT_DIALOG_DATA) public data: {start:Date,end:Date,id:string},private calendarProService:CalendarProService,private dateService:DateService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl(null, Validators.required),
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
      nbTotalPlaces: new FormControl(null, Validators.required)
    });
  }

  add() {
    this.is_loading = true;
  let Seance = new SeanceEs();
  Seance.start = this.form.value.start;
  Seance.end =   this.form.value.end;
  Seance.date =    this.dateService.getDate(this.form.value.date);
  Seance.nbPlacesAvailable =this.form.value.nbTotalPlaces;
  Seance.nbTotalPlaces =this.form.value.nbTotalPlaces;
  Seance.calendarProId =this.data.id;

  this.calendarProService.addSeance(Seance,this.data.id).subscribe(data=>{
    this.dialogRef.close('created');
  })
  }
}

