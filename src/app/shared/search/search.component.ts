import {Component, HostListener, NgZone, OnInit} from '@angular/core';
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
  isMobileResolution = false;
  public list:List[]=[];

  constructor(public zone: NgZone) {
    this.isMobileResolution = window.innerWidth < 1000;
  }

  ngOnInit(): void {
    this.list = [
      {title:$localize`:@@search.med:medicine`,img:'../../../assets/img/medecine.jpg'},
      {title:$localize`:@@search.ent:entertainment`,img:'../../../assets/img/divertissement.jpg'},
      {title:$localize`:@@search.sp:sport`,img:'../../../assets/img/sport.jpg'},
      {title:$localize`:@@search.mat:maintenance`,img:'../../../assets/img/maintenance.jpg'},

    ]
    this.is_Loading = false;
  }
  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isMobileResolution = window.innerWidth < 1000;
  }




}
