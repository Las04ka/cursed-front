import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlogData, IBlogModel } from 'src/app/blog/interfaces/blog-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<IBlogData[]> {
    return this.http.get<IBlogData[]>(`${environment.apiUrl}/blog`);
  }

  getPostById(id: string): Observable<IBlogData> {
    return this.http.get<IBlogData>(`${environment.apiUrl}/blog/${id}`);
  }

  editPost(id: string, blog: IBlogModel) {
    return this.http.put(`${environment.apiUrl}/blog/${id}`, blog);
  }

  addPost(blog: IBlogModel) {
    return this.http.post(`${environment.apiUrl}/blog`, blog);
  }

  deletePost(id: string) {
    return this.http.delete(`${environment.apiUrl}/blog/${id}`);
  }
}
