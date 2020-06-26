import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/posts/post/post.component';
import { LoadScrollComponent } from './components/load-scroll/load-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadScrollComponent,
    PostsComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxInfiniteScrollerModule,
  ],
  exports: [LoadScrollComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
