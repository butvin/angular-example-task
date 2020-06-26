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
    <div class="">
      <div class="card post-container shadow p-3 mb-5 bg-white rounded border-0" *ngIf="post;">
        <article class="card-body">
          <h3 class="card-title font-weight-bold">{{ post.title | uppercase }}</h3>
          <p class="card-text text-justify lead">{{ post.body }}</p>
          <p class="card-subtitle mb-2 text-muted text-right">{{ post.id }}</p>
        </article>
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
