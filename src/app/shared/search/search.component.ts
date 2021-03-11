import {Component, NgZone, OnInit} from '@angular/core';
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
  is_Loading:boolean=true;
  address: Object;
  formattedAddress: string;
  public list:List[]=[];

  constructor(public zone: NgZone) { }

  ngOnInit(): void {
    this.list = [
      {title:'médecine',img:'../../../assets/img/medecine.jpg'},
      {title:'divertissement',img:'../../../assets/img/divertissement.jpg'},
      {title:'sport',img:'../../../assets/img/sport.jpg'},
      {title:'maintenance',img:'../../../assets/img/maintenance.jpg'},

    ]
    this.is_Loading = false;
  }
  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }






}
