import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {DateService} from "../service/date.service";

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrls: ['./search-by-date.component.css']
})
export class SearchByDateComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SearchByDateComponent>,private dateService:DateService) { }

  ngOnInit(): void {
  }

  search(f: NgForm) {
    this.dialogRef.close(this.dateService.getDate(f.value.date))
  }
}
