import {Component, Input, OnInit} from '@angular/core';
import {CommentEs} from "../model/CommentsEs";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment :CommentEs;
  constructor() { }

  ngOnInit(): void {
  }

}
