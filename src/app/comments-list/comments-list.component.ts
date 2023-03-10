import { CommentServiceService } from './../comment-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {

  nick: string = "";
  name: string = "";
  text: string = "";
  date: Date = new Date();

  commentsList: Comment[] = [];


  constructor(private commentsService: CommentServiceService,
    public auth: AuthServiceService) {}

  @Input()
  dishName: string = ""

  ngOnInit(): void {
    this.getComments();
  }


  submitted(): void{
    let newComment: Comment = ({
      dishName: this.dishName,
      nick: this.nick,
      name: this.name,
      text: this.text,
      date: this.date
    })

    //console.log(newComment);
    this.commentsService.addComment(newComment);
    this.getComments();

    //console.log(this.commentsList);
    this.nick = "";
    this.name = "";
    this.text = "";
    this.date = new Date();
  }

  getComments(): void{
    this.commentsList = this.commentsService.getCommentsList(this.dishName);
  }

}


interface Comment{
  dishName: string,
  nick: string,
  name: string,
  text: string,
  date: Date
}

