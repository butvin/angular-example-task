import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostsComponent} from './components/posts/posts.component';


const routes: Routes = [
  {path: 'posts', component: PostsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
