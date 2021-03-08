import {Component, Input, OnInit} from '@angular/core';
declare interface List {
  img:string,
  title:string,
}
@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.css']
})
export class CardSearchComponent implements OnInit {
  @Input() list:List;
  constructor() { }

  ngOnInit(): void {
  }

}
