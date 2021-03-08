import { Component, OnInit } from '@angular/core';
declare interface List {
  img:string,
  title:string,
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public list:List[] =[
    {title:'médecine',img:'../../../assets/img/medecine.jpg'},
    {title:'divertissement',img:'../../../assets/img/divertissement.jpg'},
    {title:'sport',img:'../../../assets/img/sport.jpg'},
    {title:'maintenance',img:'../../../assets/img/maintenance.jpg'},

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
