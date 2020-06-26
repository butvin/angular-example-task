import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subscription, Subscriber, throwError} from 'rxjs';

import { PostsService } from '../../services/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Post } from './post/post.component';
import { PostComponent } from './post/post.component';
import {finalize} from 'rxjs/operators';
import {SubscribeOnObservable} from 'rxjs/internal-compatibility';

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


// export class PostsQuery implements PostsState{
//   constructor() {
//     super();
//   }
//
//   hasMore: boolean;
//   page: number;
//
//   getHasMore() {
//     return this.hasMore;
//   }
//
//   getPage() {
//     return this.page;
//   }
// }

export class PostsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  posts$: Observable<Post[]>;
  isLoading$: Observable<boolean>;

  // private observer: IntersectionObserver;

  public posts: Array<any> = [];
  // public posts: number | any[] = [];
  metaResponse;
  error;
  time;
  private page: number = null;

  response;
  public meta: {};

  constructor(private postsService: PostsService) {}



  private getCurrentPage(): number {
    return this.page === null ? 1 : this.page;
  }

  private setNextPage(): number {
    return this.page = this.getCurrentPage() + 1;
  }

  private fetchPosts() {

    const page: number = this.getCurrentPage();
    console.log(page);

    this.postsService.getPosts(page).subscribe(
      (response: JSON) => {
        JSON.parse(JSON.stringify(response));
        const posts: [] = (response as any).result;
        const _meta: {} = (response as any)._meta;
        // this.response = JSON.parse(JSON.stringify(response));
        this.meta = JSON.parse(JSON.stringify(_meta));
        this.posts = this.posts.concat([ ...JSON.parse(JSON.stringify(posts))]);
        // console.log('_meta => ', _meta);
        console.log('This 20 qty.=> ', posts);
        console.log('Total qty => ', this.posts);
        // console.log('meta => ', this.metaResponse);
      },
      (error: HttpErrorResponse) => {
        this.error = (error.error instanceof ErrorEvent) ?
          error.error.message :
          (`Code ${error.status}, ` + `Body: ${error.error}`);
        this.error = throwError('Huston, we have a trouble.');
      },
      () => {
        // this.isLoading$.subscribe( (next) => {} );
        console.log(`Posts attached from the ${page} th page`);
        this.setNextPage();
      }
    );
  }

  onScroll() {
    this.fetchPosts(); // .then( (result) => { console.log('result => ', result); });
  }

  ngOnInit() {

    // this.subscription = this.isLoading$.subscribe( (next) => {
    //   console.log('next[1]', next);
    // });

    this.isLoading$ = new Observable<boolean>(
      (observer) => {
        observer.next(true);
        // observer.complete();
    });

    this.posts$ = new Observable<Post[]>();

    // this.fetchPosts();

    /* Get time by Observable every 1000ms */
    this.time = new Observable<string>(observer => {
      setInterval(() => observer.next(new Date().toString() ), 1000);
    });
  }

  ngOnDestroy() {
    // this.isLoading$.unsubscribe();
  }
}
