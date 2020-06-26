import {Component, Input, OnInit} from '@angular/core';

export type Post = {
  id?: number;
  user_id?: number | string;
  title: string;
  body: string;
};

@Component({
  selector: 'app-post',
  template: `
    <div class="card" *ngIf="post;">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }} <small></small></h5>
        <p class="card-text">{{ post.body }}</p>
        <p class="card-text text-right">{{ post.id }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
