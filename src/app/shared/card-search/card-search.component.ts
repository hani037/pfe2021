import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
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
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  search() {
    this.router.navigateByUrl('search/aa/aa')
  }
}
