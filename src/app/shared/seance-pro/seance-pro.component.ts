import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SeanceEs} from "../model/SeanceEs";

@Component({
  selector: 'app-seance-pro',
  templateUrl: './seance-pro.component.html',
  styleUrls: ['./seance-pro.component.css']
})
export class SeanceProComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {seance:SeanceEs},private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  delete() {

  }
}
