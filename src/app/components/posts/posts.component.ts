import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';

import {PostsService} from '../../services/posts.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Post} from './post/post';
import {Meta} from './meta';

export interface ApiDataResponse{
  _meta: Meta;
  result: Post[];
}

// export const POSTS: Post[] = [];

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit, OnDestroy {

  page: number = null;
  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;
  posts: Array<Post> = [];
  error;
  time;
  response$: Observable<ApiDataResponse>;
  meta: {};

  trackByIncrement(index: number = 1) {
    return index++;
  }

  constructor(private postsService: PostsService) {}

  private getCurrentPage(): number {
    return this.page === null ? 1 : this.page;
  }

  private setNextPage(): number {
    return this.page = this.getCurrentPage() + 1;
  }

  private fetchPosts() {
    this.postsService.getPosts(this.getCurrentPage()).subscribe(
      (data) => {
        const posts: Array<Post> = (data as any).result;
        this.meta = (data as any)._meta;
        console.log(posts, '::', typeof posts);
        this.posts = this.posts.concat(posts);
        // this.posts$ = this.posts$.concat([ ...((data as any).result)]);
        console.log('just loaded meta', this.meta);
        console.log('this.posts$', this.posts);
        console.log('page', this.getCurrentPage());
      },
      (error: HttpErrorResponse) => {
              this.error = (error.error instanceof ErrorEvent) ?
                error.error.message :
                (`Code ${error.status}, ` + `Body: ${error.error}`);
              this.error = throwError('Huston, we have a trouble.');
            },
      () => this.setNextPage()
    );
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
