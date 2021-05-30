import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventService} from "../service/event.service";
import {CalendarProService} from "../service/calendarPro.service";
import {CommentEs} from "../model/CommentsEs";
import {SeanceEs} from "../model/SeanceEs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-display-comments',
  templateUrl: './display-comments.component.html',
  styleUrls: ['./display-comments.component.css']
})
export class DisplayCommentsComponent implements OnInit {
  public comments:CommentEs[];
  public  is_Loading=true;
  nb=0;
  form: FormGroup;
  constructor(private dialogRef: MatDialogRef<DisplayCommentsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { seance: SeanceEs},private calendarProService:CalendarProService,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      text: ['', Validators.required],
    })
      this.getSeanceComments();
  }
  addComment(){
    this.is_Loading = true;
  let comment = new CommentEs();
  comment.text = this.form.value.text;
  comment.isAdmin = false;
  this.calendarProService.addComment(this.data.seance.id,comment).subscribe(data=>{
    this.getSeanceComments();
    this.form.get('text').setValue('');
  })
  }
  deleteComment(id){


  }
  getSeanceComments(){
    this.calendarProService.getSeanceComments(this.data.seance.id).subscribe(data=>{
      this.comments = data;
      this.is_Loading = false;
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
}
