import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SeanceEs} from "../model/SeanceEs";
import {CalendarProService} from "../service/calendarPro.service";

@Component({
  selector: 'app-seance-pro',
  templateUrl: './seance-pro.component.html',
  styleUrls: ['./seance-pro.component.css']
})
export class SeanceProComponent implements OnInit {
  is_loading:boolean= false;
  constructor(private dialogRef: MatDialogRef<SeanceProComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {seance:SeanceEs,calendarProId:string},private dialog: MatDialog
              ,private calendarProService:CalendarProService) { }

  ngOnInit(): void {
  }

  delete() {
    this.is_loading = true;
  this.calendarProService.deleteSeance(this.data.seance,this.data.calendarProId).subscribe(data=>{
    this.dialogRef.close('deleted')
  })
  }
}
