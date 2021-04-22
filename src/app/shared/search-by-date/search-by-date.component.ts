import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrls: ['./search-by-date.component.css']
})
export class SearchByDateComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SearchByDateComponent>) { }

  ngOnInit(): void {
  }

  search(f: NgForm) {
    let day = ("0" + f.value.date.getDate()).slice(-2);
    let month = ("0" + (f.value.date.getMonth()+1 )).slice(-2);
    let year = f.value.date.getYear()+1900;
    let date = year +"-"+month+"-"+day
    console.log(date);
    this.dialogRef.close(date)
  }
}
