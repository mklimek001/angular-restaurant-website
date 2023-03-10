import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css']
})
export class SingleCommentComponent implements OnInit {

  constructor() { }

  @Input()
  comment: Comment = ({
    dishName: "",
    nick: "",
    name: "",
    text: "",
    date: new Date("2022-01-01")
  })

  ngOnInit(): void {
  }

}


interface Comment{
  dishName: string,
  nick: string,
  name: string,
  text: string,
  date: Date
}
