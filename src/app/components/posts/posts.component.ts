import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import { Observable, throwError} from 'rxjs';

import { PostsService } from '../../services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from './post/post.component';

export interface PostsState {
  hasMore?: boolean;
  page: number;
}

export const initState: PostsState = {
  hasMore: true,
  page: 1
};

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit, OnDestroy {

  private page: number = null;
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;
  posts: Array<any> = [];
  error;
  time;
  response;
  meta: {};
  trackByFn(){
    return false;
  }

  constructor(private postsService: PostsService) {}

  private getCurrentPage(): number {
    return this.page === null ? 1 : this.page;
  }

  private setNextPage(): number {
    return this.page = this.getCurrentPage() + 1;
  }

  private fetchPosts() {
    const page: number = this.getCurrentPage();

    this.postsService.getPosts(page).subscribe(
      (response: JSON) => {
        JSON.parse(JSON.stringify(response));
        const posts: [] = (response as any).result;
        const _meta: {} = (response as any)._meta;
        this.response = JSON.parse(JSON.stringify(response));
        this.meta = JSON.parse(JSON.stringify(_meta));
        this.posts = this.posts.concat([ ...JSON.parse(JSON.stringify(posts))]);
        console.log('just loaded => ', posts);
        console.log('total loaded => ', this.posts);
        console.log('loaded from => ', page);
      },
      (error: HttpErrorResponse) => {
        this.error = (error.error instanceof ErrorEvent) ?
          error.error.message :
          (`Code ${error.status}, ` + `Body: ${error.error}`);
        this.error = throwError('Huston, we have a trouble.');
      },
      () => { this.setNextPage(); });
  }

  onScroll() {
    this.fetchPosts();
  }

  ngOnInit() {
    this.isLoading$ = new Observable<boolean>(
      (observer) => { observer.next(true);
    });

    this.posts$ = new Observable<Post[]>();

    /* Get time by Observable every 1000ms */
    this.time = new Observable<string>(observer => {
      setInterval(() => observer.next(new Date().toString() ), 1000);
    });
  }

  ngOnDestroy() {
    this.isLoading$.subscribe().unsubscribe();
    this.posts$.subscribe().unsubscribe();
  }
}
