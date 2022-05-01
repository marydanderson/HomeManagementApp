import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';


import { Post } from "./post.model";

@Injectable({providedIn: 'root'})

export class PostsService {

  constructor(private http: HttpClient) {}

  // http request methods listed hear

  //
  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content}
    // http request:
    this.http.post<{name: string}>(
      'https://ng-complete-guide-c23cf-default-rtdb.firebaseio.com/posts.json',
      postData
      )
      .subscribe(responseData => {
        console.log(responseData)
      });
  }

  fetchPosts() {
    // http request; need to subscribe in component utilizing
    return this.http.get<{[key: string]: Post}>(
      'https://ng-complete-guide-c23cf-default-rtdb.firebaseio.com/posts.json',
    )
    // transform data into array for easy output into html
    .pipe(
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key});
          }
        }
        return postsArray
      })
    )
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-c23cf-default-rtdb.firebaseio.com/posts.json')
  }
}