import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SeanceEs} from "../model/SeanceEs";
import {CalendarProService} from "../service/calendarPro.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DisplayCommentsComponent} from "../display-comments/display-comments.component";

@Component({
  selector: 'app-seance-pro',
  templateUrl: './seance-pro.component.html',
  styleUrls: ['./seance-pro.component.css']
})
export class SeanceProComponent implements OnInit {
  is_loading:boolean= false;
  nb=0;
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  constructor(private dialogRef: MatDialogRef<SeanceProComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {seance:SeanceEs,calendarProId:string},private dialog: MatDialog
              ,private calendarProService:CalendarProService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  delete() {
    this.is_loading = true;
  this.calendarProService.deleteSeance(this.data.seance.id).subscribe(data=>{
    this.dialogRef.close('deleted')
  })
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {

      const file ={data: fileUpload.files[0], inProgress: false, progress: 0};
      this.uploadFile(file,this.data.seance.id)
    };
    fileUpload.click();

  }
  uploadFile(file, id: string) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.is_loading = true;
    this.calendarProService.uploadImage(formData, id).subscribe(data => {
      this.dialogRef.close('Image uploaded ');
      this.openSnackBar('Image uploaded ', 'Exit');
    })
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  next(){
    this.nb++;
    if (this.nb==this.data.seance.images.length){
      this.nb =0;
    }
  }
  prev(){
    this.nb--;
    if(this.nb<0){
      this.nb =this.data.seance.images.length-1;
    }
  }
  openComments() {
    this.dialog.open(DisplayCommentsComponent, {
      backdropClass: 'backdropBackground',
      data :{seance:this.data.seance}
    })
  }
}
